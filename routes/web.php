<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AboutUs;
use App\Http\Controllers\Admin\FileUploadController as FileUpload;
use App\Http\Controllers\Admin\GaleriController as Galleri;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Dev\DevController;


//|--------------------------------------------------------------------------
//| Web Routes
//|--------------------------------------------------------------------------
Route::middleware(['web', 'throttle:10,2'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::get('tentang-kami', function () {
        return Inertia::render('about-us');
    })->name('about');

    Route::get('gallery', function () {
        return Inertia::render('gallery');
    })->name('gallery');

    Route::get('berita-kegiatan', function () {
        return Inertia::render('berita-kegiatan');
    })->name('news');

    Route::get('kontak-kami', function () {
        return Inertia::render('contact-us');
    })->name('contact');
});
//|-------------------------- end web routes -----------------------------------

//|--------------------------------------------------------------------------
//| Auth Routes
//|--------------------------------------------------------------------------
Route::middleware(['auth', 'verified', 'throttle:10,2'])->group(function () {

//|--------------------------------------------------------------------------
//| Admin Routes
//|--------------------------------------------------------------------------
    Route::group(['prefix' => 'atmin'], function () {
    //|----------------------------------------------------------------------
        Route::get('dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('atmin.dashboard');

        Route::get('app-settings', function () {
            return Inertia::render('admin/app-settings');
        })->name('atmin.app-settings');

        Route::get('berita', function () {
            return Inertia::render('admin/berita');
        })->name('atmin.berita');

        //|----------------------------------------------------------------------
        //| Konten Management
        //|----------------------------------------------------------------------
        Route::group(['prefix' => 'konten-manajemen'], function (){
            //|----------------------------------------------------------------------
            //| Tentang Kami
            Route::group(['prefix' => 'tentang-kami'], function () {
                Route::get('index', function () {
                    return Inertia::render('admin/konten-manajemen/tentang-kami/page');
                })->name('atmin.konten-manajemen.tentang-kami.index');

                Route::post('update',[
                    AboutUs::class, 'update'
                ])->name('atmin.konten-manajemen.tentang-kami.update');
            });
            //|---------------------------end home-----------------------------------

            //|----------------------------------------------------------------------
            //| Gallery
            //|----------------------------------------------------------------------
            Route::group(['prefix' => 'galeri'], function () {
                Route::get('index', function () {
                    return Inertia::render('admin/konten-manajemen/galeri/page');
                })->name('atmin.konten-manajemen.galeri.index');

                Route::get('create', function () {
                    return Inertia::render('admin/konten-manajemen/galeri/create');
                })->name('atmin.konten-manajemen.galeri.create');

                Route::get('show/{id}', [Galleri::class, 'show'])->name('atmin.konten-manajemen.galeri.show');

                Route::get('edit/{id}', [Galleri::class, 'edit'])->name('atmin.konten-manajemen.galeri.edit');

                Route::post('store-main', [FileUpload::class, 'storeMainData'])->name('atmin.konten-manajemen.galeri.store-main');
                Route::post('{galeriId}/upload-files', [FileUpload::class, 'uploadFiles'])->name('atmin.konten-manajemen.galeri.galeri.upload-files');

                Route::post('update/{id}', [
                    FileUpload::class, 'update'
                ])->name('atmin.konten-manajemen.galeri.update');

                Route::delete('destroy/{id}', [FileUpload::class, 'destroyGaleri'])->name('atmin.konten-manajemen.galeri.destroy');
            });
            //|---------------------------end gallery-----------------------------------

            //|----------------------------------------------------------------------
            //| Kontak Kami
            //|----------------------------------------------------------------------
            Route::group(['prefix' => 'kontak-kami'], function () {
                Route::get('index', function () {
                    return Inertia::render('admin/konten-manajemen/kontak-kami/page');
                })->name('atmin.konten-manajemen.kontak-kami.index');
            });

            //|----------------------------------------------------------------------
            //| Banner
            //|----------------------------------------------------------------------
            Route::group(['prefix' => 'banner'], function(){
                Route::get('index', function () {
                    return Inertia::render('admin/konten-manajemen/banners/page');
                })->name('atmin.konten-manajemen.banner.index');

                Route::get('edit/{id}', function ($id) {
                    return Inertia::render('konten-manajemen/banner/edit', [
                        'id' => $id,
                    ]);
                })->name('atmin.konten-manajemen.banner.edit');

                Route::post('store/{any}', [HeroController::class, 'store'])->name('atmin.konten-manajemen.banner.store.any');

                Route::put('update/{any}/{id}', [
                    HeroController::class, 'update'
                ])->name('atmin.konten-manajemen.banner.update');

                Route::delete('destroy/{any}/{id}', [HeroController::class, 'destroy'])->name('atmin.konten-manajemen.banner.destroy');
            });
            // | end banner
        });
        //|-------------------------end konten routes---------------------------------

        //|--------------------------------------------------------------------------
        //| devHeloper Routes
        //|--------------------------------------------------------------------------

        Route::group(['prefix' => 'developing'], function () {
            Route::get('index', [DevController::class, 'index'])->name('atmin.dev.index');
        });
        //|-------------------------- end dev routes -------------------------------
    });
//|-------------------------- end admin routes -----------------------------------




//|--------------------------------------------------------------------------
//| Web clear cache
//|--------------------------------------------------------------------------
    Route::post('/clear-cache', function () {
        Artisan::call('optimize:clear');
        Artisan::call('config:clear');
        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        Log::info('Cache cleared by ' . auth()->user()->name . ' at ' . now());
        return response()->json([
            'status' => 'success',
            'message' => 'Cache cleared successfully',
        ]);
    })->name('clear-cache');
//|-------------------------- end cache routes -----------------------------------
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
