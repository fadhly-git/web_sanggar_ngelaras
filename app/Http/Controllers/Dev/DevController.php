<?php

namespace App\Http\Controllers\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Banners;
use App\Models\Image;

class DevController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dev/index');
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
        // Check if the {any} parameter is 'banner'
        if ($any == 'heading') {
            $validate = $request->validate([
                'heading' => 'required|string|max:255',
                'sub_heading' => 'required|string|max:255',
                'link' => 'required|url|max:255',
            ]);
            // Create a new banner
            $banner = new Banners();
            $banner->heading = $request->input('heading');
            $banner->sub_heading = $request->input('sub_heading');
            $banner->link = $request->input('link');
            $banner->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Banner created successfully.',
                'data' => $banner,
            ]);
        } else if ($any == 'image') {

            $validate = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            // Store the image
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            // Save the image path to the database
            $banner = new Image();
            $banner->name = $imageName;
            $banner->path = 'images/' . $imageName;
            $banner->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Image uploaded successfully.',
                'data' => $banner,
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid parameter.',
            ]);
        }
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
