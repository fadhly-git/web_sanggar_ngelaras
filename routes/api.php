<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\AboutUs;
use App\Http\Controllers\Admin\GaleriController;
use App\Http\Controllers\NewsItems;
use App\Http\Controllers\Admin\ContactUsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('throttle:10,1')->group(function () {
    Route::get('/hero-data', [
        HeroController::class,
        'index'
    ])->name('hero-data.index');

    Route::get('about-us-data',[
        AboutUs::class,
        'index'
    ])->name('about-us-data.index');

    Route::get('gallery-data', [
        GaleriController::class,
        'index'
    ])->name('gallery-data.index');

    Route::get('contact-us-data', [
        ContactUsController::class,
        'index'
    ])->name('contact-us-data.index');

    Route::get('news-items-data', [
        NewsItems::class,
        'index'
    ])->name('news-items-data.index');
});

Route::middleware(['auth:sanctum', 'verified','throttle:10,2'])->group(function () {
    Route::get('apa', function(){
        return response()->json(['message' => 'Hello, authenticated user!']);
    })->name('apa');

    Route::post('store-faqs', [
        ContactUsController::class,
        'storeFaqs'
    ])->name('store-faqs');

    Route::delete('destroy-faqs/{id}', [
        ContactUsController::class,
        'destroyFaqs'
    ])->name('destroy-faqs');
});


