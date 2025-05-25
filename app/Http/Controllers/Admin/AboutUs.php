<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AboutUs as AboutUsModel;
use Illuminate\Support\Facades\Validator;
use App\Models\Misi;
use Log;

class AboutUs extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil AboutUs beserta misi terkait
        $aboutUs = AboutUsModel::with('misi')->first();

        return response()->json([
            'aboutUs' => $aboutUs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        Log::info('Request data', [
            'summary' => $request->summary,
            'img_banner' => $request->img_banner,
        ]);
        // Validasi dasar
        $validate = $request->validate([
            'id' => 'required|exists:about_us,id',
            'tentang_kami' => 'required',
            'summary' => 'required',
            'sejarah' => 'required',
            'visi' => 'required',
            'img_banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'misi' => 'array',
            'misi.*.icon' => 'required|string',
            'misi.*.deskripsi' => 'required|string',
            'misi.*.urutan' => 'required|integer',
        ]);
        Log::info('Validasi berhasil', $validate);
        try {
            // Ambil data about_us
            $aboutUs = AboutUsModel::findOrFail($request->id);

            // Update field
            $aboutUs->tentang_kami = $request->tentang_kami;
            $aboutUs->summary = $request->summary;
            $aboutUs->sejarah = $request->sejarah;
            $aboutUs->visi = $request->visi;

            // Upload gambar jika ada
            if ($request->hasFile('img_banner')) {
                // Hapus gambar lama jika ada
                if ($aboutUs->img_banner) {
                    $oldImagePath = public_path($aboutUs->img_banner);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                $image = $request->file('img_banner');
                $imageName = $image->getClientOriginalName() . time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $aboutUs->img_banner = 'images/' . $imageName;
            }

            $aboutUs->save();

            // Hapus semua misi lama
            $aboutUs->misi()->delete();

            // Tambahkan misi baru
            foreach ($request->misi as $misiData) {
                $aboutUs->misi()->create([
                    'icon' => $misiData['icon'],
                    'deskripsi' => $misiData['deskripsi'],
                    'urutan' => $misiData['urutan'],
                ]);
            }

            return back()->with('success', 'Data berhasil diperbarui');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
