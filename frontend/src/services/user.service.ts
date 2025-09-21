import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

type GetCurrentUserParams = {
  accessToken: string;
};

type GetUserParams = GetCurrentUserParams & { id: number };
type UpdateUserParams = GetUserParams & { name: string };

type GetAllUsersParams = GetCurrentUserParams;

type CreateUserParams = {
  accessToken: string;
  email: string;
  fullName: string;
  password: string;
};

type ChangePasswordParams = {
  accessToken: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type ImpersonateUserParams = {
  accessToken: string;
  userId: number;
};

type StopImpersonationParams = {
  accessToken: string;
};

export const getCurrentUser = async ({
  accessToken,
}: GetCurrentUserParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user/current`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const getUser = async ({
  accessToken,
  id,
}: GetUserParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const getAllUsers = async ({
  accessToken,
}: GetAllUsersParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user/all`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const updateUser = async ({
  accessToken,
  id,
  name,
}: UpdateUserParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user/${id}`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      user: {
        name,
      },
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const createUser = async ({
  accessToken,
  email,
  fullName,
  password,
}: CreateUserParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      email,
      name: fullName,
      password,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const changePassword = async ({
  accessToken,
  currentPassword,
  newPassword,
  confirmNewPassword,
}: ChangePasswordParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user/change-password`, // Make sure this URL matches the one in your Laravel routes
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmNewPassword, // This should match the 'confirmed' validation rule in Laravel
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const impersonateUser = async ({
  accessToken,
  userId,
}: ImpersonateUserParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user/${userId}/impersonate`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const stopImpersonation = async ({
  accessToken,
}: StopImpersonationParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/user/stop-impersonation`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};
