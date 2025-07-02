import { KEY_STORAGE_ADMIN } from '~/constans';
import { isSiteAdmin } from '~/lib/utils';

export const getToken = () => {
  if (isSiteAdmin()) {
    return localStorage.getItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN);
  }
  return null;
};

export const saveToken = (token: string) => {
  if (isSiteAdmin()) {
    localStorage.setItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN, token);
  }
};

export const removeDataLogout = () => {
  if (isSiteAdmin()) {
    localStorage.removeItem(KEY_STORAGE_ADMIN.ACCESS_TOKEN);
  }
};
