<?php

namespace App\Http\Controllers;

use App\Contracts\JWTServiceInterface;
use App\Events\NewMessage;
use App\Http\Requests\PostMessageRequest;
use App\Http\Requests\PostThreadRequest;
use App\Models\Message;
use App\Models\Thread;

class ChatController extends Controller
{
    public function getThread(int $id): \Illuminate\Http\JsonResponse
    {
        $user = get_user_by_auth_header();
        $thread = Thread::with('messages')->find($id);

        foreach ($thread->participants as $participant) {
            $found = $user->id === $participant->id;

            if ($found) {
                return response()->json($thread);
            }
        }

        return response()->json([
            "error" => "Not found"
        ])->setStatusCode(201);
    }

    public function getThreadByUser(int $id)
    {
        $user = get_user_by_auth_header();
        $_thread = null;

        foreach ($user->threads as $thread) {
            foreach ($thread->participants as $participant) {
                if ($participant->id === $id) {
                    $_thread = $thread;
                    break;
                }
            }

            if ($_thread) {
                break;
            }
        }

        if (!$_thread) {
            $_thread = new Thread();
            $_thread->type = "ONE_TO_ONE";
            $_thread->save();
            $_thread->participants()->attach($user->id);
            $_thread->participants()->attach($id);
            $_thread->update();

            $_thread->refresh();
        }

        return response()->json($_thread);
    }

    public function getThreads()
    {
        $user = get_user_by_auth_header();
        return response()->json($user->threads ?? []);
    }

    public function createThread(PostThreadRequest $request)
    {
        $params = json_decode($request->getContent(), true);
    }

    public function getContacts()
    {
        return response()->json(\App\Models\User::all());
    }

    public function searchContacts(string $query)
    {
        if ($query === "") {
            return response()->json([]);
        }

        $user = get_user_by_auth_header();

        $contacts = \App\Models\User::where([
            ['email', 'LIKE', '%'.$query.'%'],
            ['email', '!=', $user->email],
        ])->orWhere([
            ['name', 'LIKE', '%'.$query.'%'],
            ['email', '!=', $user->email],
        ])->get();

        return response()->json($contacts ?? []);
    }

    public function sendMessage(int $threadId, PostMessageRequest $request)
    {
        $params = json_decode($request->getContent(), true);
        $user = get_user_by_auth_header();
        $message = new Message();
        $message->author_id = $user->id;
        $message->thread_id = $threadId;
        $message->body = $params['body'];
        $message->content_type = "text";
        $message->save();

        event(new NewMessage($message));

        return response()->json([
            'result' => 'success'
        ]);
    }
}
