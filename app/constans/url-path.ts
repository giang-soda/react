export const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

const PREFIX_ADMIN = 'admin/';
const PREFIX_USER = '/';

export const URL_PATH = {
  HOME: `${BASE_URL}`,
  ERROR: {
    PAGE_403: `${BASE_URL}403`,
    PAGE_404: `${BASE_URL}404`,
    PAGE_500: `${BASE_URL}500`,
    PAGE_503: `${BASE_URL}503`,
  },
  USER: {
    AUTH: {
      LOGIN: `${BASE_URL}${PREFIX_USER}auth/login`,
    },
  },
  ADMIN: {
    HOME: `${BASE_URL}${PREFIX_ADMIN}`,
    DASHBOARD: `${BASE_URL}${PREFIX_ADMIN}dashboard`,
    AUTH: {
      LOGIN: `${BASE_URL}${PREFIX_ADMIN}auth/login`,
    },
    USERS: {
      LIST: `${BASE_URL}${PREFIX_ADMIN}users`,
      CREATE: `${BASE_URL}${PREFIX_ADMIN}users/create`,
      EDIT: (id: string) => `${BASE_URL}${PREFIX_ADMIN}users/${id}`,
    },
    EDITOR: {
      CKEDITOR: `${BASE_URL}${PREFIX_ADMIN}editor/ckeditor`,
    },
    TODO_REMOVE: {
      THROW_ERROR: `${BASE_URL}${PREFIX_ADMIN}throw-error`,
    },
  },
};
