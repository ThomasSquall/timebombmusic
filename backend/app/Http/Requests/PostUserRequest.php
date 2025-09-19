<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\ArrayShape;

class PostUserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    #[ArrayShape(['user.email' => "string", 'user.user_id' => 'string'])]
    public function rules(): array
    {
        return [
            'user.email' => 'required|email',
            'user.user_id' => 'string'
        ];
    }
}
