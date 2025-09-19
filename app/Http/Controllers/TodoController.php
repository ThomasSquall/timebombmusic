<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CompleteTodoRequest;
use App\Models\Todo;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TodoController extends Controller
{
    public function getTodayTodos(): \Illuminate\Http\JsonResponse
    {
        $user = get_user_by_auth_header();
        return response()->json($user->todos()->whereDate('due_date',  Carbon::today())->get());
    }

    public function getTomorrowTodos(): \Illuminate\Http\JsonResponse
    {
        $user = get_user_by_auth_header();
        return response()->json($user->todos()->whereDate('due_date',  Carbon::tomorrow())->get());
    }

    public function getTodo(Todo $todo): \Illuminate\Http\JsonResponse
    {
        return response()->json($todo);
    }

    public function getTodos()
    {
        \logger("get all todos for user");

        $user = get_user_by_auth_header();
        return response()->json($user->todos);
    }

    public function getAllTodos()
    {
        \logger("get all todos");
        $user = get_user_by_auth_header();

        if ($user->is_admin) {
            return response()->json(Todo::with('user')->get());
        }

        return $this->getTodos();
    }

    public function createTodo(Request $request)
    {
        $user = get_user_by_auth_header();

        if (!$user->is_admin) {
            return response()->json([
                "error" => true,
                "code" => 101
            ]);
        }

        $params = json_decode($request->getContent(), true);

        $todo = new Todo();
        $todo->user_id = $params['user_id'];
        $todo->name = $params['name'];
        $todo->notes = $params['notes'];

        if (!empty($params['due_date']) && strtotime($params['due_date'])) {
            $params['due_date'] = strtotime($params['due_date']);
        } else {
            $params['due_date'] = (int)$params['due_date'];
            $params['due_date'] /= 1000;

            $params['due_date'] += 7200;
        }

        $todo->due_date = date("Y-m-d", $params['due_date']);
        $todo->save();
        $todo->refresh();

        return response()->json([
            "error" => false,
            "code" => 100,
            "id" => $todo->id
        ]);
    }

    public function updateTodo(Todo $todo, Request $request)
    {
        \logger("update todo");
        $user = get_user_by_auth_header();

        if (!$user->is_admin && $todo->user_id !== $user->id) {
            return response()->json([
                "error" => true,
                "code" => 101
            ]);
        }

        $params = json_decode($request->getContent(), true);

        $todo->name = $params['name'] ?? $todo->name;
        $todo->notes = $params['notes'] ?? $todo->notes;

        if (isset($params['due_date']) && !empty($params['due_date'])) {
            $inputDate = $params['due_date']; // Example: "15/11/2024"

            // Create a DateTime object with the given format
            $dateTime = DateTime::createFromFormat('d/m/Y', $inputDate);

            if ($dateTime !== false) {
                // Format the date as Y-m-d
                $formattedDate = $dateTime->format('Y-m-d');
                $params['due_date'] = $formattedDate;
            } else {
                unset($params['due_date']);
            }
        }

        $todo->due_date = isset($params['due_date']) ? date("Y-m-d", strtotime($params['due_date'])) : $todo->due_date;
        $todo->completed = isset($params['completed']) ? $params['completed'] : 0;

        \logger("todo", [$todo->toArray()]);

        $todo->save();
        $todo->refresh();

        return response()->json([
            "error" => false,
            "code" => 100
        ]);
    }

    public function completeTodo(Todo $todo, CompleteTodoRequest $request)
    {
        $user = get_user_by_auth_header();

        if ($todo->user_id !== $user->id) {
            return response()->json([
                "error" => true,
                "code" => 101
            ]);
        }

        $params = json_decode($request->getContent(), true);

        $todo->completed = $params['completed'];
        $todo->update();
        $todo->refresh();

        return response()->json([
            "error" => false,
            "code" => 100
        ]);
    }

    public function deleteTodo(Todo $todo)
    {
        $user = get_user_by_auth_header();

        if (!$user->is_admin && $todo->user_id !== $user->id) {
            return response()->json([
                "error" => true,
                "code" => 101
            ]);
        }

        $todo->delete();

        return response()->json([
            "error" => false,
            "code" => 100
        ]);
    }
}
