<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::put('user/change-password', [UserController::class, 'changePassword'])->name('changePassword');
    Route::get('user/current', [UserController::class, 'getCurrentUser'])->name('getCurrentUser');
    Route::post('/upload-avatar', [UserController::class, 'uploadAvatar'])->name('uploadAvatar');
    Route::post('user/stop-impersonation', [UserController::class, 'stopImpersonation'])->name('stopImpersonation');

    Route::get('thread/all', [ChatController::class, 'getThreads'])->name('getThreads');
    Route::get('thread/{id}', [ChatController::class, 'getThread'])->name('getThread');
    Route::get('thread/user/{id}', [ChatController::class, 'getThreadByUser'])->name('getThreadByUser');
    Route::post('thread', [ChatController::class, 'createThread'])->name('createThread');
    Route::get('contacts', [ChatController::class, 'getContacts'])->name('getContacts');
    Route::get('contacts/{query}', [ChatController::class, 'searchContacts'])->name('searchContacts');
    Route::post('message/{threadId}', [ChatController::class, 'sendMessage'])->name('sendMessage');

    Route::get('todo', [TodoController::class, 'getTodos'])->name('getTodos');
    Route::post('todo', [TodoController::class, 'createTodo'])->name('createTodo');
    Route::delete('todo/{todo}', [TodoController::class, 'deleteTodo'])->name('deleteTodo');
    Route::get('todo/today', [TodoController::class, 'getTodayTodos'])->name('getTodayTodos');
    Route::get('todo/tomorrow', [TodoController::class, 'getTomorrowTodos'])->name('getTomorrowTodos');
    Route::get('todo/{todo}', [TodoController::class, 'getTodo'])->name('getTodo');
    Route::put('todo/{todo}', [TodoController::class, 'updateTodo'])->name('updateTodo');
    Route::patch('todo/complete/{todo}', [TodoController::class, 'completeTodo'])->name('completeTodo');


    Route::get('dashboard/percentages', [DashboardController::class, 'getTodosPercentages'])->name('getTodosPercentages');
    Route::get('dashboard/days/count', [DashboardController::class, 'getTodosDaysCount'])->name('getTodosDaysCount');
});

Route::group(['middleware' => ['auth:api', 'is_admin']], function () {
    Route::post('user', [UserController::class, 'createUser'])->name('creteUser');
    Route::get('user/all', [UserController::class, 'getAllUsers'])->name('getAllUsers');
    Route::get('user/{id}', [UserController::class, 'getUser'])->name('getUser');
    Route::put('user/{id}', [UserController::class, 'updateUser'])->name('updateUser');
    Route::post('user/{id}/impersonate', [UserController::class, 'impersonate'])->name('impersonateUser');
    Route::get('todos/all', [TodoController::class, 'getAllTodos'])->name('getAllTodos');
});

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::get('check-token-validity', [TokenController::class, 'checkTokenValidity'])->name('checkTokenValidity');
Route::get('refresh-token', [TokenController::class, 'refresh'])->name('refreshToken');
