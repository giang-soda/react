import axios, { AxiosError, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios';
import config from '~/config';
import { getToken, removeDataLogout, saveToken } from '~/lib/auth';
import type { TFunction } from 'i18next';
import { toast } from 'sonner';
import type React from 'react';

interface IHandleError {
  t: TFunction;
  message?: Record<string, string>;
}

interface IResponse {
  code?: string;
  data?: Record<string, React.ReactNode>;
}

export const api = axios.create({
  baseURL: (config.VITE_BASE_API ?? '') + '/api/',
  proxy: false,
  responseType: 'json',
});

api.interceptors.request.use(
  (configAxios: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const newConfig: InternalAxiosRequestConfig = { ...configAxios };
    const token = getToken();
    if (token) {
      newConfig.headers.set('Authorization', `Bearer ${token}`);
    }

    return newConfig;
  }
);

api.interceptors.response.use(
  response => {
    if (response.data && response.headers['content-type'].includes('application/json')) {
      if (response.data?.tokens?.access) {
        saveToken(response.data.tokens.access);
      }
    }

    return response;
  },
  error => {
    // Ensure the error is properly propagated as an Error object
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    // If it's not an Error object, create a new one
    const errorMessage = error?.message || 'An unknown error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export function handleError(error: AxiosError, { t, message }: IHandleError) {
  const messageDefault = message?.default ?? t('errors.500.notification', { ns: 'common' });

  // error run time
  if (!error.response) {
    toast.error(messageDefault);
    return messageDefault;
  }

  // error token expired -> relogin
  if (error.response.status === Number(HttpStatusCode.Unauthorized)) {
    removeDataLogout();
    // redirect to login page when token expired
    window.location.href = '/';

    return null;
  }

  let code: string;

  if (typeof error.response.data === 'object' && (error.response.data as IResponse).code) {
    code = String((error.response.data as IResponse).code);
  } else {
    code = error.response.status.toString();
  }

  // if message has code -> show message
  if (message && code in message) {
    toast.error(message[code]);
    return message[code];
  }

  if (message?.default) {
    toast.error(message.default);
    return message.default;
  }

  // message belong http status
  if (error.response.status === Number(HttpStatusCode.NotFound)) {
    const m = t('errors.404.notification', { ns: 'common' });
    toast.error(m);
    return m;
  }

  const m = t('errors.500.notification', { ns: 'common' });
  toast.error(m);
  return m;
}

// TODO: test mock status, remove in produciton
export function fakeApi(
  status: HttpStatusCode,
  data?: Record<string, React.ReactNode>,
  delay = 2000
): Promise<{ data: Record<string, React.ReactNode> }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === HttpStatusCode.Ok) {
        return resolve({ data: data ?? {} });
      }

      const error = AxiosError.from({
        response: {
          status,
          data,
        },
      });

      reject(error);
    }, delay);
  });
}
