const PREFIX_ADMIN = 'admin/';
const PREFIX_USER = '/';

export const URL_PATH = {
  HOME: `/`,
  ERROR: {
    PAGE_403: `/403`,
    PAGE_404: `/404`,
    PAGE_500: `/500`,
    PAGE_503: `/503`,
  },
  USER: {
    AUTH: {
      LOGIN: `${PREFIX_USER}auth/login`,
    },
  },
  ADMIN: {
    HOME: PREFIX_ADMIN,
    DASHBOARD: `${PREFIX_ADMIN}dashboard`,
    AUTH: {
      LOGIN: `${PREFIX_ADMIN}auth/login`,
      LOGOUT: `${PREFIX_ADMIN}auth/logout`,
    },
    USERS: {
      LIST: `${PREFIX_ADMIN}users`,
      CREATE: `${PREFIX_ADMIN}users/create`,
      EDIT: (id: string) => `${PREFIX_ADMIN}users/${id}`,
    },
    EDITOR: {
      CKEDITOR: `${PREFIX_ADMIN}editor/ckeditor`,
    },
    TODO_REMOVE: {
      THROW_ERROR: `${PREFIX_ADMIN}throw-error`,
    },
  },
  REDIRECT: `/redirect`,
};
