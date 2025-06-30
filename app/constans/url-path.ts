export const URL_PATH = {
  DASHBOARD: '/dashboard',
  ERROR: {
    PAGE_403: '/403',
    PAGE_404: '/404',
    PAGE_500: '/500',
    PAGE_503: '/503',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users/create',
    EDIT: (id: string) => `/users/${id}`,
  },
  EDITOR: {
    CKEDITOR: '/editor/ckeditor',
  },
  TODO_REMOVE: {
    THROW_ERROR: '/throw-error',
  },
};
