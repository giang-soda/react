import { KEY_STORAGE_ADMIN } from '~/constans';
import { isSiteAdmin } from '~/lib/utils';

export const getToken = (isAdmin?: boolean) => {
  if (isAdmin === true || isSiteAdmin()) {
    return localStorage.getItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN);
  }
  return null;
};

export const saveToken = (token: string, isAdmin?: boolean) => {
  if (isAdmin === true || isSiteAdmin()) {
    localStorage.setItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN, token);
  }
};

export const removeDataLogout = (isAdmin?: boolean) => {
  if (isAdmin === true || isSiteAdmin()) {
    localStorage.removeItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN);
  }
};
