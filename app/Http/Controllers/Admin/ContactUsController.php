<?php

namespace App\Http\Controllers\Admin;

use App\Models\KontakKami;
use App\Models\Faq;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kontakKami = KontakKami::first();
        $faqs = Faq::all();

        return response()->json([
            'kontak_kami' => $kontakKami,
            'faqs' => $faqs->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // This method is not typically used in API controllers, but you can return a view if needed.
        return response()->json(['message' => 'Create method not implemented'], 405);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeFaqs(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'is_active' => 'numeric|in:0,1',
            'id' => 'nullable|integer|exists:faqs,id', // Optional ID for updating existing FAQ
        ]);

        $faq = new Faq();
        $faq->store($validated);
        if (!$faq) {
            return back()->withErrors(['message' => 'Failed to save FAQ']);
        }

        return back()->with('success', 'FAQ berhasil disimpan.');
    }

    /**
     * Remove the specified FAQ from storage.
     */
    public function destroyFaqs($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json(['message' => 'FAQ deleted successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(KontakKami $kontakKami)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KontakKami $kontakKami)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KontakKami $kontakKami)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'judul_kontak' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telepon' => 'required|string|max:50',
            'jam_operasional' => 'required|string|max:255',
            'judul_maps' => 'required|string|max:255',
            'maps' => 'required|string',
        ]);

        $kontakKami->store($validated);

        return back()->with('success', 'Data kontak kami berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KontakKami $kontakKami)
    {
        //
    }
}
