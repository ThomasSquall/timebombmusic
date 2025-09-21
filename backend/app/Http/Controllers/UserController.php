<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\PutUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController
{
    public function getAllUsers()
    {
        $user = get_user_by_auth_header();

        if ($user->is_admin) {
            return response()->json(User::all());
        }

        return response()->json([]);
    }

    public function getUser(int $id)
    {
        return response()->json(
            User::with(['todos' => function ($query) {
                $query->orderBy('id', 'DESC');
            }])->find($id)
        );
    }

    public function getCurrentUser()
    {
        $user = get_user_by_auth_header();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $impersonator = null;

        $impersonatorId = get_impersonator_id();

        if ($impersonatorId) {
            $impersonator = User::find($impersonatorId);
        }

        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'auth0_id' => $user->auth0_id,
            'avatar' => $user->avatar,
            'name' => $user->name,
            'is_admin' => $user->is_admin,
            'impersonator' => $impersonator ? $impersonator->only(['id', 'name', 'email']) : null,
        ]);
    }

    public function impersonate(Request $request, int $id)
    {
        $admin = get_user_by_auth_header();

        if (!$admin || !$admin->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($admin->id === $id) {
            return response()->json(['message' => 'Cannot impersonate yourself'], 422);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $token = JWTAuth::claims([
            'impersonator_id' => $admin->id,
        ])->fromUser($user);

        return response()->json([
            'token' => $token,
            'impersonator' => $admin->only(['id', 'name', 'email']),
        ]);
    }

    public function stopImpersonation(Request $request)
    {
        try {
            $payload = JWTAuth::parseToken()->getPayload();
        } catch (JWTException $exception) {
            return response()->json(['message' => 'Invalid token'], 400);
        }

        if (!$payload->has('impersonator_id')) {
            return response()->json(['message' => 'You are not impersonating any user'], 400);
        }

        $impersonatorId = $payload->get('impersonator_id');

        $impersonator = User::find($impersonatorId);

        if (!$impersonator) {
            return response()->json(['message' => 'Original user not found'], 404);
        }

        $token = JWTAuth::fromUser($impersonator);

        return response()->json(['token' => $token]);
    }

    public function createUser(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Create the user using Eloquent
        $user = new User();
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->auth0_id = uniqid();
        $user->save();

        // Return a response
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }


    public function updateUser(PutUserRequest $request, int $id)
    {
        $params = json_decode($request->getContent(), true);

        $user = User::find($id);
        $user->name = $params['user']['name'];
        $user->update();
        $user->refresh();
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = get_user_by_auth_header();
        $avatarPath = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $avatarPath;
        $user->save();

        return response()->json(['avatar' => $avatarPath]);
    }

    public function changePassword(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'current_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = auth()->user(); // Retrieve the authenticated user

        // Check if the provided current password matches the stored password
        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided current password does not match our records.']
            ]);
        }

        // Update the user's password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully',
        ], 200);
    }
}
