<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banners;
use App\Models\Image;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all banners from the database
        $banners = Banners::all();
        // fetch all images from the database
        $images = Image::all();
        // Return the banners as a JSON response
        return response()->json([
            'banners' => $banners,
            'images' => $images,
            'message' => 'Hero data fetched successfully'
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
            return back()->with('success', 'data berhasil disimpan');
        } else if ($any == 'image') {

            $validate = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            // Store the image
            $image = $request->file('image');
            $imageName = $image->getClientOriginalName() . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            // Save the image path to the database
            $banner = new Image();
            $banner->name = $imageName;
            $banner->path = 'images/' . $imageName;
            $banner->save();
            return back()->with('success', 'data berhasil disimpan');
        } else {
            return back()->with('error', 'Invalid type');
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
    public function update(Request $request, $any, string $id)
    {
        if ($any == 'heading') {
            $request->validate([
                'heading' => 'required|string|max:255',
                'sub_heading' => 'required|string|max:255',
                'link' => 'required|url',
                'is_active' => 'required|integer|between:0,1',
            ]);

            $banner = Banners::findOrFail($id);
            $banner->heading = $request->input('heading');
            $banner->sub_heading = $request->input('sub_heading');
            $banner->link = $request->input('link');
            $banner->is_active = $request->input('is_active');
            $banner->save();

            return back()->with('success', 'Banner updated successfully');
        } else if ($any == 'image') {
            // Log::info('Updating image with ID: ' . $id . ' and type: ' . $any . ' with request: ' . json_encode($request->input('name')));
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $Image = Image::findOrFail($id);
            $Image->name = $request->input('name');
            $Image->save();

            return back()->with('success', 'Banner updated successfully');
        }
        return response()->json(['message' => 'Invalid parameter'], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($any, string $id)
    {
        Log::info('Deleting resource with ID: ' . $id . ' and type: ' . $any);
        if ($any == 'heading') {
            $banner = Banners::find($id);
            if ($banner) {
                $banner->delete();
                return response()->json([
                    'message' => 'Banner deleted successfully'
                ]);
            } else {
                return response()->json([
                    'message' => 'Banner not found'
                ], 404);
            }
        } elseif ($any == 'image') {
            $image = Image::find($id);
            if ($image) {
                if ($image->path) {
                    $imagePath = public_path($image->path);
                    if (file_exists($imagePath)) {
                        @unlink($imagePath);
                    }
                }
                $image->delete();
                return response()->json([
                    'message' => 'Image deleted successfully'
                ]);
            } else {
                return response()->json([
                    'message' => 'Image not found'
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'Invalid type'
            ], 400);
        }
    }
}
