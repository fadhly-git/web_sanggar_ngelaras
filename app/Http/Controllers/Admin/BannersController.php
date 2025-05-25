<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Banners;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class BannersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all banners from the database
        $banners = Banners::all();
        // Return the banners as a JSON response
        return $banners;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'heading' => 'required|string|max:255',
            'sub_heading' => 'required|string|max:255',
            'link' => 'required|url',
        ]);

        $banner = new Banners();
        $banner->heading = $request->input('heading');
        $banner->sub_heading = $request->input('sub_heading');
        $banner->link = $request->input('link');
        $banner->save();

        return response()->json(['message' => 'Banner created successfully'], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $any, string $id)
    {
        if ($any == 'heading') {
            $request->validate([
                'heading' => 'required|string|max:255',
                'sub_heading' => 'required|string|max:255',
                'link' => 'required|url',
            ]);

            $banner = Banners::findOrFail($id);
            $banner->heading = $request->input('heading');
            $banner->sub_heading = $request->input('sub_heading');
            $banner->link = $request->input('link');
            $banner->save();

            return back()->with('success', 'Banner updated successfully');
        } else if ($any == 'image') {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $banner = Banners::findOrFail($id);
            if ($request->hasFile('image')) {
                // Delete the old image if it exists
                if ($banner->image) {
                    Storage::delete($banner->image);
                }
                // Store the new image
                $path = $request->file('image')->store('images');
                $banner->image = $path;
                $banner->save();
            }

            return response()->json(['message' => 'Image updated successfully'], 200);
        }
        return response()->json(['message' => 'Invalid parameter'], 400);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
