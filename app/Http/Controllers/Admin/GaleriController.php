<?php

namespace App\Http\Controllers\Admin;

use App\Models\GaleriModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GaleriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galeri = GaleriModel::with('items')->get();
        return response()->json($galeri->toArray());
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
    public function store(Request $request, $any)
    {
        if ($any === 'title') {
            $request->validate([
                'title' => 'required|string',
                'deskripsi' => 'required|string',
            ]);

            // $galeri = GaleriModel::create([
            //     'title' => $request->title,
            //     'deskripsi' => $request->deskripsi,
            // ]);
            // $id = $galeri->id;
            $id = 1;

            return response()->json([ 'id' => $id ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GaleriModel $galeriModel, $id)
    {
        $galeri = GaleriModel::with('items')->find($id);
        if (!$galeri) {
            return response()->json(['message' => 'Galeri not found'], 404);
        }
        return response()->json($galeri->toArray());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $galeri = GaleriModel::with('items')->find($id);
        return Inertia::render('admin/konten-manajemen/galeri/edit', [
            'data_edit' => $galeri,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GaleriModel $galeriModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GaleriModel $galeriModel)
    {
        //
    }
}
