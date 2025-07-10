import { KEY_STORAGE_ADMIN } from '~/constans';
import { isSiteAdmin } from '~/lib/utils';
import { getItem, removeItem, setItem } from './local-storage';

export const getToken = (isAdmin?: boolean) => {
  if (isAdmin === true || isSiteAdmin()) {
    return getItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN);
  }
  return null;
};

export const saveToken = (token: string, isAdmin?: boolean) => {
  if (isAdmin === true || isSiteAdmin()) {
    setItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN, token);
  }
};

export const removeDataLogout = (isAdmin?: boolean) => {
  if (isAdmin === true || isSiteAdmin()) {
    removeItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN);
  }
};
