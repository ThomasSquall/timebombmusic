import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

type GetTodosParams = {
  accessToken: string;
};

type GetTodoParams = GetTodosParams & { id: number };

export const getTodayTodos = async ({
  accessToken,
}: GetTodosParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo/today`,
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

export const getTomorrowTodos = async ({
  accessToken,
}: GetTodosParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo/tomorrow`,
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

export const getTodos = async ({
  accessToken,
}: GetTodosParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const getTodo = async ({
  accessToken,
  id,
}: GetTodoParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

export const getAllTodos = async ({
  accessToken,
}: GetTodosParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todos/all`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });


  return {
    data,
    error,
  };
};

type CreateTodosParams = {
  accessToken: string;
  name: string;
  notes?: string;
  due_date: string;
  user_id: number;
};

export const createTodo = async ({
  accessToken,
  name,
  notes,
  due_date,
  user_id,
}: CreateTodosParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo`,
    method: "POST",
    data: {
      name,
      notes,
      due_date,
      user_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

type UpdateTodoParams = {
  accessToken: string;
  id: number;
  name: string;
  notes?: string;
  due_date: string;
  completed: boolean;
};

export const updateTodo = async ({
  accessToken,
  id,
  name,
  notes,
  due_date,
  completed,
}: UpdateTodoParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo/${id}`,
    method: "PUT",
    data: {
      name: name || undefined,
      notes: notes || undefined, 
      due_date: due_date || undefined,
      completed: completed || undefined
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

type ChangeTodoDatePrams = {
  accessToken: string;
  id: number;
  due_date: string;
};

export const changeTodoDate = async ({
  accessToken,
  id,
  due_date,
}: ChangeTodoDatePrams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo/${id}`,
    method: "PUT",
    data: {
      due_date,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

type CompleteTodoParams = {
  accessToken: string;
  id: number;
  completed: boolean;
};

export const completeTodo = async ({
  accessToken,
  id,
  completed,
}: CompleteTodoParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo/complete/${id}`,
    method: "PATCH",
    data: {
      completed,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};

type DeleteTodoParams = {
  accessToken: string;
  id: number;
};

export const deleteTodo = async ({
  accessToken,
  id,
}: DeleteTodoParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/todo/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
};
