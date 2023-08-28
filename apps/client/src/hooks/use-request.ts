import axios, { AxiosError, AxiosRequestConfig } from "axios";
import React from "react";

import { ErrorResponseData } from "@/types/response-error-data";

type UseRequestProps<RequestBody = any> = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  config?: AxiosRequestConfig;
  body?: RequestBody;
};

export const useRequest = <RequestBody = any, ResponseBody = any>({
  url,
  method,
  config,
  body: initialBody,
}: UseRequestProps<RequestBody>) => {
  const [errors, setErrors] = React.useState<ErrorResponseData["errors"]>();
  const [isLoading, setIsLoading] = React.useState(false);

  const doRequest = async (
    body?: RequestBody,
  ): Promise<ResponseBody | void> => {
    setIsLoading(true);
    try {
      const response = await axios[method]<RequestBody, ResponseBody>(
        url,
        body || initialBody,
        config,
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors((error?.response?.data as ErrorResponseData).errors);
      }
    }
    setIsLoading(false);
  };

  return { doRequest, errors, isLoading };
};
