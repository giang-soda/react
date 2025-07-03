export const API_ENDPOINT = {
  ADMIN: {
    AUTH: {
      LOGIN: '/users',
    },
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
};
