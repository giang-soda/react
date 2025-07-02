export const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

export const URL_PATH = {
  HOME: `${BASE_URL}`,
  DASHBOARD: `${BASE_URL}dashboard`,
  ERROR: {
    PAGE_403: `${BASE_URL}403`,
    PAGE_404: `${BASE_URL}404`,
    PAGE_500: `${BASE_URL}500`,
    PAGE_503: `${BASE_URL}503`,
  },
  AUTH: {
    LOGIN: `${BASE_URL}auth/login`,
  },
  USERS: {
    LIST: `${BASE_URL}users`,
    CREATE: `${BASE_URL}users/create`,
    EDIT: (id: string) => `${BASE_URL}users/${id}`,
  },
  EDITOR: {
    CKEDITOR: `${BASE_URL}editor/ckeditor`,
  },
  TODO_REMOVE: {
    THROW_ERROR: `${BASE_URL}throw-error`,
  },
};
