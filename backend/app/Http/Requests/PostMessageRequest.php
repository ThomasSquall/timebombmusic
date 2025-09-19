<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\ArrayShape;

class PostMessageRequest extends Request
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
    #[ArrayShape(['body' => "string"])]
    public function rules(): array
    {
        return [
            'body' => 'required|string',
        ];
    }
}
