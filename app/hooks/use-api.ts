import React, { useState } from 'react';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, type QueryKey } from '@tanstack/react-query';
import { api, handleError, bodyToCamelCase } from '~/api';
import type { MutationResponse, QueryResponse, UseApiResponse } from '~/models';

interface IUseApiRequest {
  message?: Record<string, string>;
  isResetDataCall?: boolean;
  bodyParamsStruct?: object;
}

interface IUseApiQueryRequest {
  querykey: QueryKey;
  message?: Record<string, string>;
  bodyParamsStruct?: object;
}

interface IUseApiMutationRequest {
  message?: Record<string, string>;
  bodyParamsStruct?: object;
}

export function useApi(axiosOption: AxiosRequestConfig, options?: IUseApiRequest): UseApiResponse {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [data, setData] = useState<React.ReactNode | null>(null);
  const { t } = useTranslation('common');

  const call = async () => {
    setIsLoading(true);
    setError(null);
    if (options?.isResetDataCall) {
      setData(null);
    }

    try {
      // require struct for body params
      if (axiosOption.data && options?.bodyParamsStruct) {
        axiosOption.data = bodyToCamelCase(axiosOption.data, options.bodyParamsStruct);
      } else {
        axiosOption.data = {};
      }

      const response = await api(axiosOption);
      setData(response.data);

      return response.data;
    } catch (error) {
      const e = handleError(error as AxiosError, { t, message: options?.message });
      setError(e);
      setData(null);

      return e;
    } finally {
      setIsLoading(false);
    }
  };

  const resetData = (newData: React.ReactNode | null = null) => {
    setData(newData);
    setError(null);
  };

  return {
    isLoading,
    error,
    data,
    call,
    resetData,
  };
}

export function useApiQuery<T>(
  axiosOption: AxiosRequestConfig,
  options?: IUseApiQueryRequest
): QueryResponse<T> {
  if (axiosOption.data && options?.bodyParamsStruct) {
    axiosOption.data = bodyToCamelCase(axiosOption.data, options.bodyParamsStruct);
  } else {
    axiosOption.data = {};
  }

  const { t } = useTranslation('common');

  const query = useQuery({
    queryKey: options?.querykey ?? [],
    queryFn: async () => {
      try {
        return await api(axiosOption);
      } catch (e) {
        const err = handleError(e as AxiosError, { t, message: options?.message });

        if (err) {
          throw new Error(err);
        }

        return null;
      }
    },
  });

  return {
    data: query.data?.data as T,
    query,
  };
}

export function useApiMutation(
  axiosOption: AxiosRequestConfig,
  options?: IUseApiMutationRequest
): MutationResponse {
  if (axiosOption.data && options?.bodyParamsStruct) {
    axiosOption.data = bodyToCamelCase(axiosOption.data, options.bodyParamsStruct);
  } else {
    axiosOption.data = {};
  }

  const { t } = useTranslation('common');

  const mutation = useMutation({
    mutationFn: () => api(axiosOption),
    onError: (err: AxiosError) => {
      handleError(err, { t, message: options?.message });
    },
  });

  return {
    data: mutation.data?.data,
    mutation,
  };
}
