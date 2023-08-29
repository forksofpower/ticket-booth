import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";

import { ErrorResponseData } from "@/types/response-error-data";

type UseRequestProps<RequestBody = any, ResponseBody = any> = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  config?: AxiosRequestConfig;
  body?: RequestBody;
  onSuccess?: (data?: ResponseBody) => void;
};

export const useRequest = <RequestBody = any, ResponseBody = any>({
  url,
  method,
  config,
  body: initialBody,
  onSuccess,
}: UseRequestProps<RequestBody, ResponseBody>) => {
  const [errors, setErrors] = React.useState<ErrorResponseData["errors"]>();
  const [isLoading, setIsLoading] = React.useState(false);

  const doRequest = async (
    body?: RequestBody
  ): Promise<ResponseBody | void> => {
    setIsLoading(true);
    try {
      const response = await axios[method]<
        RequestBody,
        AxiosResponse<ResponseBody>
      >(url, body || initialBody, config);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors((error?.response?.data as ErrorResponseData).errors);
      } else console.error(error);
    }
    setIsLoading(false);
  };

  return { doRequest, errors, isLoading };
};
