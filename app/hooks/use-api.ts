import React, { useState } from 'react';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, type QueryKey } from '@tanstack/react-query';
import { api, handleError, bodyToCamelCase } from '~/api';
import type { MutationResponse, QueryResponse, UseApiResponse } from '~/models';
import { useNavigate } from 'react-router';
import { useQueryRefreshKey } from './use-query';

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

interface IUseApiMutationRequest<T> {
  message?: Record<string, string>;
  bodyParamsStruct?: object;
  redirect?: string; // redirect to url after success
  refreshQuerykey?: QueryKey; // invalidate query key after success
  onSuccess?: (data: T) => void; // callback after success
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

  const query = useQuery<T>({
    queryKey: options?.querykey ?? [],
    queryFn: async () => {
      try {
        const data = (await api(axiosOption)).data;

        if (typeof data !== 'object') {
          throw new Error('Data response is not json object');
        }

        return data;
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
    query,
  };
}

export function useApiMutation<T>(
  axiosOption: AxiosRequestConfig,
  options?: IUseApiMutationRequest<T>
): MutationResponse {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const queryRefreshKey = useQueryRefreshKey();

  const mutation = useMutation({
    mutationFn: (
      data?: Record<string, React.ReactNode> | null,
      rewriteAxiosOption?: AxiosRequestConfig
    ) => {
      if (data && options?.bodyParamsStruct) {
        axiosOption.data = bodyToCamelCase(data, options.bodyParamsStruct);
      } else {
        axiosOption.data = {};
      }

      if (rewriteAxiosOption) {
        axiosOption = {
          ...axiosOption,
          ...rewriteAxiosOption,
        };
      }

      return api(axiosOption);
    },
    onError: err => {
      handleError(err as AxiosError, { t, message: options?.message });
    },
    onSuccess(response) {
      options?.onSuccess?.(response.data as T);
      queryRefreshKey.call(options?.refreshQuerykey);

      if (options?.redirect) {
        void navigate(options.redirect);
      }
    },
  });

  return {
    mutation,
  };
}
