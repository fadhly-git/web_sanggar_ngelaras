<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\AboutUs;
use App\Http\Controllers\Admin\GaleriController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('throttle:10,2')->group(function () {
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
});


