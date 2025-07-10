import { basename } from '../lib/url';

const PREFIX_ADMIN = `${basename}admin/`;
const PREFIX_USER = `${basename}`;

export const URL_PATH = {
  HOME: `${PREFIX_USER}`,
  ERROR: {
    PAGE_403: `${PREFIX_USER}403`,
    PAGE_404: `${PREFIX_USER}404`,
    PAGE_500: `${PREFIX_USER}500`,
    PAGE_503: `${PREFIX_USER}503`,
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
    POSTS: {
      LIST: `${PREFIX_ADMIN}posts`,
      DETAIL: (slug: string) => `${PREFIX_ADMIN}posts/${slug}`,
    },
    EDITOR: {
      CKEDITOR: `${PREFIX_ADMIN}editor/ckeditor`,
    },
    TODO_REMOVE: {
      THROW_ERROR: (err: string) => `${PREFIX_ADMIN}throw-error/${err}`,
    },
  },
  REDIRECT: `${PREFIX_USER}redirect`,
};
