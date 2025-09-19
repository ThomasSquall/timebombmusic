import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

type GetThreadsParams = {
  accessToken: string;
};

export const getThreads = async ({
  accessToken,
}: GetThreadsParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/thread/all`,
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

type GetThreadParams = {
  accessToken: string;
  threadId: number | string;
};

export const getThread = async ({
  accessToken,
  threadId,
}: GetThreadParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/thread/${threadId}`,
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

type GetContactsParams = {
  accessToken: string;
};

export const getContacts = async ({
  accessToken,
}: GetContactsParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/contacts`,
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

type SearchContactsParams = {
  accessToken: string;
  query: string;
};

export const searchContacts = async ({
  accessToken,
  query,
}: SearchContactsParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/contacts/${query}`,
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

type GetThreadByUserParams = {
  accessToken: string;
  id: string;
};

export const getThreadByUser = async ({
  accessToken,
  id,
}: GetThreadByUserParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/thread/user/${id}`,
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

type SendMessageParams = {
  accessToken: string;
  threadId: string;
  body: string;
};

export const sendMessage = async ({
  accessToken,
  threadId,
  body,
}: SendMessageParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/message/${threadId}`,
    method: "POST",
    data: {
      body,
    },
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
