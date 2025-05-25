<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\GaleriModel;
use App\Models\ItemsGaleriModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    // Simpan data utama (tanpa file)
    public function storeMainData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'deskripsi' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $galeri = GaleriModel::create([
                'title' => $request->title,
                'deskripsi' => $request->deskripsi,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data utama berhasil disimpan',
                'data' => $galeri->id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data utama',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Upload file setelah data utama berhasil disimpan
    public function uploadFiles(Request $request, $galeriId)
    {
        $validator = Validator::make($request->all(), [
            'files.*' => 'required|file|mimes:jpg,jpeg,png,gif|max:10240',
            'item_titles.*' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $galeri = GaleriModel::findOrFail($galeriId);

            foreach ($request->file('files') as $index => $file) {
                $imageName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) .
                    '_' . time() . '.' .
                    $file->getClientOriginalExtension();

                $file->move(public_path('images'), $imageName);

                ItemsGaleriModel::create([
                    'galeri_model_id' => $galeri->id,
                    'item_title' => $request->item_titles[$index] ?? null,
                    'img_path' => 'images/' . $imageName,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'File berhasil diupload',
                'data' => $galeri->load('items')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupload file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Hapus seluruh galeri beserta file-nya
    public function destroyGaleri($id)
    {
        try {
            DB::beginTransaction();

            $galeri = GaleriModel::with('items')->findOrFail($id);

            // Hapus file fisik
            foreach ($galeri->items as $item) {
                if (file_exists(public_path($item->img_path))) {
                    unlink(public_path($item->img_path));
                }
            }

            // Hapus dari database (items akan terhapus otomatis karena onDelete cascade)
            $galeri->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Galeri beserta semua file berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus galeri',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Hapus satu item galeri
    public function destroyItem($id)
    {
        try {
            $item = ItemsGaleriModel::findOrFail($id);

            // Hapus file fisik
            if (file_exists(public_path($item->img_path))) {
                unlink(public_path($item->img_path));
            }

            // Hapus dari database
            $item->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Update data galeri
    public function update(Request $request, $id)
    {

        // Validasi input
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'deskripsi' => 'sometimes|string',
            'files.*' => 'sometimes|file|mimes:jpg,jpeg,png,gif,svg|max:10240',
            'item_titles' => 'sometimes|array',
            'item_titles.*' => 'nullable|string|max:255',
            'deleted_items' => 'sometimes|array',
            'deleted_items.*' => 'sometimes|exists:items_galeri_models,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $galeri = GaleriModel::findOrFail($id);

            // Update data utama
            if ($request->has('title')) {
                $galeri->title = $request->title;
            }
            if ($request->has('deskripsi')) {
                $galeri->deskripsi = $request->deskripsi;
            }
            $galeri->save();

            // Update existing item titles
            if ($request->has('item_titles')) {
                foreach ($request->item_titles as $itemId => $title) {
                    $item = ItemsGaleriModel::find($itemId);
                    if ($item) {
                        $item->item_title = $title;
                        $item->save();
                    }
                }
            }

            // Hapus item yang diminta
            if ($request->has('deleted_items')) {
                foreach ($request->deleted_items as $itemId) {
                    $item = ItemsGaleriModel::find($itemId);
                    if ($item) {
                        if (file_exists(public_path($item->img_path))) {
                            unlink(public_path($item->img_path));
                        }
                        $item->delete();
                    }
                }
            }

            // Tambah file baru jika ada
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $imageName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) .
                        '_' . time() . '.' .
                        $file->getClientOriginalExtension();

                    $file->move(public_path('images'), $imageName);

                    ItemsGaleriModel::create([
                        'galeri_model_id' => $galeri->id,
                        'item_title' => null, // Default null, bisa diupdate nanti
                        'img_path' => 'images/' . $imageName,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diupdate',
                'data' => $galeri->load('items')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get detail galeri
    public function show($id)
    {
        try {
            $galeri = GaleriModel::with('items')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $galeri
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Galeri tidak ditemukan',
                'error' => $e->getMessage()
            ], 404);
        }
    }
}
