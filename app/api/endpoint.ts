export const API_ENDPOINT = {
  // TODO: test file call api, remove in production
  TODOS: {
    LIST: '/users',
    ID: '/users/:id',
    CREATE: '/users',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: '/users/:id',
  },
  // TODO: test file call api, remove in production
  FAKE_ERROR: {
    PAGE_404: '/users/errors/404',
  },
};
