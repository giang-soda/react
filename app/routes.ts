import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';
import { URL_PATH } from './constans';

export default [
  layout('layouts/AppLayout.tsx', [
    index('routes/dashboard/index.tsx'), // home
    route(URL_PATH.DASHBOARD, 'routes/dashboard/Dashboard.tsx'),

    // TODO demo router
    route(URL_PATH.USERS.LIST, 'routes/users/List.tsx'),
    route(URL_PATH.USERS.CREATE, 'routes/users/Create.tsx'),
    route(URL_PATH.USERS.EDIT(':id'), 'routes/users/Edit.tsx'),

    route(URL_PATH.TODO_REMOVE.THROW_ERROR, 'routes/dashboard/ThrowError.tsx'),
  ]),

  layout('layouts/AuthLayout.tsx', prefix('/auth', [route('/login', 'routes/auth/Login.tsx')])),

  // error page
  route(URL_PATH.ERROR.PAGE_403, 'routes/errors/403.tsx'),
  route(URL_PATH.ERROR.PAGE_500, 'routes/errors/500.tsx'),
  route(URL_PATH.ERROR.PAGE_503, 'routes/errors/503.tsx'),
  route('*', 'routes/errors/404.tsx'),
] satisfies RouteConfig;
