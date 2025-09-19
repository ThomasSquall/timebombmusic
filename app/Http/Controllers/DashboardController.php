<?php

namespace App\Http\Controllers;

use App\Models\Todo;

class DashboardController extends Controller
{
    public function getTodosPercentages()
    {
        $user = get_user_by_auth_header();

        /** @var Todo[] $todos */
        $todos = $user->todos;

        $byDates = [];

        foreach ($todos as $todo) {
            if ($todo->due_date > date('Y-m-d')) {
                continue;
            }

            if (!isset($byDates[$todo->due_date])) {
                $byDates[$todo->due_date] = [
                    'completed' => 0,
                    'total' => 0
                ];
            }

            if ($todo->completed) {
                $byDates[$todo->due_date]['completed']++;
            }

            $byDates[$todo->due_date]['total']++;
        }

        $byPercentage = [
            'below_50' => 0,
            'above_50' => 0,
            '100' => 0
        ];

        foreach ($byDates as $byDate) {
            if ($byDate['completed'] === $byDate['total']) {
                $byPercentage['100']++;
            } else if ($byDate['completed'] < ($byDate['total'] / 2)) {
                $byPercentage['below_50']++;
            } else {
                $byPercentage['above_50']++;
            }
        }

        return response()->json($byPercentage);
    }

    public function getTodosDaysCount()
    {
        $user = get_user_by_auth_header();

        /** @var Todo[] $todos */
        $todos = $user->todos;

        $completedDays = [];

        foreach ($todos as $todo) {
            $completedDays[$todo->due_date] = $todo->due_date;
        }

        return response()->json(count($completedDays));
    }
}
