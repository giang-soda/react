import { type RouteConfig, layout, route } from '@react-router/dev/routes';
import { URL_PATH } from './constans';

export default [
  layout('layouts/admin/AdminLayout.tsx', [
    layout('layouts/admin/AdminAppLayout.tsx', [
      route(URL_PATH.ADMIN.HOME, 'routes/admin/home/Home.tsx'), // home
      route(URL_PATH.ADMIN.DASHBOARD, 'routes/admin/dashboard/Dashboard.tsx'),

      // TODO: demo router
      route(URL_PATH.ADMIN.USERS.LIST, 'routes/admin/users/List.tsx'),
      route(URL_PATH.ADMIN.USERS.CREATE, 'routes/admin/users/Create.tsx'),
      route(URL_PATH.ADMIN.USERS.EDIT(':id'), 'routes/admin/users/Edit.tsx'),

      route(URL_PATH.ADMIN.EDITOR.CKEDITOR, 'routes/admin/editor/CKeditorPage.tsx'),

      route(URL_PATH.ADMIN.TODO_REMOVE.THROW_ERROR, 'routes/admin/dashboard/ThrowError.tsx'),
    ]),

    layout('layouts/admin/AdminAuthLayout.tsx', [
      route(URL_PATH.ADMIN.AUTH.LOGIN, 'routes/admin/auth/Login.tsx'),
    ]),
  ]),

  layout('layouts/user/UserLayout.tsx', [
    layout('layouts/user/UserAppLayout.tsx', [
      route(URL_PATH.HOME, 'routes/user/home/Home.tsx')
    ]),
  ]),

  // error page
  route(URL_PATH.ERROR.PAGE_403, 'routes/errors/403.tsx'),
  route(URL_PATH.ERROR.PAGE_500, 'routes/errors/500.tsx'),
  route(URL_PATH.ERROR.PAGE_503, 'routes/errors/503.tsx'),
  route('*', 'routes/errors/404.tsx'),
] satisfies RouteConfig;
