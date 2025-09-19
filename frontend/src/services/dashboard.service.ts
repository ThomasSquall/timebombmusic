import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "models/api-response";
import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

type GetTodosPercentagesParams = {
  accessToken: string;
};

export const getTodosPercentages = async ({
  accessToken,
}: GetTodosPercentagesParams): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/dashboard/percentages`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: {
        hundred: data?.['100'],
        aboveFifty: data?.above_50,
        belowFifty: data?.below_50,
    },
    error,
  };
};

type GetTodosDaysCountParams = {
  accessToken: string;
};

export const getTodosDaysCount = async ({
  accessToken,
}: GetTodosDaysCountParams): Promise<number> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/dashboard/days/count`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  };

  const { data, error } = await callExternalApi({ config });

  return data as number;
};
