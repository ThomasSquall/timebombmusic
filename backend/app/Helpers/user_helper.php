<?php

function jwt_decode($token) {
    return json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))), true);
}

function get_user_id() {
    $header = $_SERVER['HTTP_AUTHORIZATION'];

    $token = explode(" ", $header)[1];

    $user_info = jwt_decode($token);

    return $user_info['sub'];
}

function get_user_by_auth_header() {
    $user_id = get_user_id();
    $user = \App\Models\User::firstWhere('id', $user_id);

    return $user;
}
