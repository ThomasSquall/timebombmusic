<?php

function jwt_decode($token) {
    return json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))), true);
}

function get_jwt_payload(): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? null;

    if (!$header) {
        return [];
    }

    $parts = explode(' ', $header);

    if (count($parts) < 2 || strtolower($parts[0]) !== 'bearer') {
        return [];
    }

    $token = $parts[1];

    if (!$token) {
        return [];
    }

    return jwt_decode($token) ?? [];
}

function get_user_id() {
    $user_info = get_jwt_payload();

    return $user_info['sub'] ?? null;
}

function get_impersonator_id() {
    $payload = get_jwt_payload();

    return $payload['impersonator_id'] ?? null;
}

function get_user_by_auth_header() {
    $user_id = get_user_id();

    if (!$user_id) {
        return null;
    }

    $user = \App\Models\User::firstWhere('id', $user_id);

    return $user;
}
