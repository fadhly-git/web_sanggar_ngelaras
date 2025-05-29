<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Ambil pengguna yang diautentikasi
        $user = $request->user();

        // Buat token menggunakan Sanctum
        // Membuat token dengan masa berlaku 7 hari (opsional, Sanctum memiliki default)
        $token = $user->createToken('auth-token', ['*'], now()->addDays(7))->plainTextToken;
        // Redirect dengan token (misalnya, melalui sesi atau respons JSON)
        // Dalam contoh ini, kita akan menggunakan sesi flash untuk menyimpan token
        return redirect(route('atmin.dashboard'))->withCookie(cookie('auth-token', $token, 60 * 24 * 7, null, null, false, false));

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Hapus semua token akses pengguna
        $user = $request->user();
        $user->tokens()->delete();
        Auth::guard('web')->logout();
        // Invalidate sesi dan meregenerasi token sesi
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
