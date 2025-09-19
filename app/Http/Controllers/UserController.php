<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\GetUserRequest;
use App\Http\Requests\PostUserRequest;
use App\Http\Requests\PutUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        return response()->json($user);
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
