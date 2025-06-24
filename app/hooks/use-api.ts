import React, { useState } from 'react';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { api, handleError, bodyToCamelCase } from '~/api';

export interface IUseApiResponse {
  isLoading: boolean;
  error: React.ReactNode | null;
  data: React.ReactNode | null;
  call: () => Promise<React.ReactNode>;
  resetData: (newData?: React.ReactNode | null) => void;
}

interface IUseApiRequest {
  message?: Record<string, React.ReactNode>;
  isResetDataCall?: boolean;
  bodyParamsStruct?: object;
}

export function useApi(axiosOption: AxiosRequestConfig, options?: IUseApiRequest): IUseApiResponse {
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
      const e = await handleError(error as AxiosError, { t, message: options?.message });
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
