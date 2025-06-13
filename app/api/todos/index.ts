// TODO: test file call api, remove in production

import type { TFunction } from 'i18next';
import type { AxiosError } from 'axios';
import { generatePath } from 'react-router';
import { api, fakeApi, handleError, API_ENDPOINT, API_ERROR_CODE } from '../';

export const getTodos = async (t: TFunction) => {
  try {
    const a = await api.get(API_ENDPOINT.TODOS.LIST);
    return a.data;
  } catch (error) {
    return handleError(error as AxiosError, { t });
  }
};

export const getTodosId = async (t: TFunction, id: number) => {
  try {
    const a = await api.get(generatePath(API_ENDPOINT.TODOS.ID, { id }));
    return a.data;
  } catch (error) {
    return handleError(error as AxiosError, { t });
  }
};

export const get404 = async (t: TFunction) => {
  try {
    const response = await api.get(API_ENDPOINT.FAKE_ERROR.PAGE_404);
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError, {
      t,
      message: {
        '404': t('errors.404.notification', { ns: 'common' }),
        '500': t('errors.500.notification', { ns: 'common' }),
        '401': t('errors.401.notification', { ns: 'common' }),
      },
    });
  }
};

export const get500 = async (t: TFunction, code?: string) => {
  try {
    const response = await fakeApi(500, {
      code: code ?? API_ERROR_CODE.TODOS.LIST,
    });
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError, {
      t,
      message: {
        default: t('errors.default', { ns: 'todos' }),
        [API_ERROR_CODE.TODOS.LIST]: t('errors.ERR_TODO_LIST', { ns: 'todos' }),
      },
    });
  }
};

export const get401 = async (t: TFunction) => {
  try {
    const response = await fakeApi(401, {
      code: API_ERROR_CODE.FAKE_ERROR[401],
    });
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError, { t });
  }
};
