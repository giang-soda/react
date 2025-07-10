import { type RouteConfig, layout, route } from '@react-router/dev/routes';
import { URL_PATH } from './constans';

export default [
  layout('layouts/admin/AdminLayout.tsx', [
    layout('layouts/admin/AdminAppLayout.tsx', [
      route(URL_PATH.ADMIN.HOME, 'routes/admin/home/Home.tsx'), // home
      route(URL_PATH.ADMIN.DASHBOARD, 'routes/admin/dashboard/Dashboard.tsx'),

      // TODO: demo router
      // users: fetch data from api
      route(URL_PATH.ADMIN.USERS.LIST, 'routes/admin/users/ListPage.tsx'),
      route(URL_PATH.ADMIN.USERS.CREATE, 'routes/admin/users/CreatePage.tsx'),
      route(URL_PATH.ADMIN.USERS.EDIT(':id'), 'routes/admin/users/EditPage.tsx'),

      // posts: loader
      route(URL_PATH.ADMIN.POSTS.LIST, 'routes/admin/posts/ListPage.tsx'),
      route(URL_PATH.ADMIN.POSTS.DETAIL(':slug'), 'routes/admin/posts/DetailPage.tsx'),

      route(URL_PATH.ADMIN.EDITOR.CKEDITOR, 'routes/admin/editor/CKeditorPage.tsx'),

      route(
        URL_PATH.ADMIN.TODO_REMOVE.THROW_ERROR(':err'),
        'routes/admin/dashboard/ThrowErrorPage.tsx'
      ),
    ]),

    layout('layouts/admin/AdminAuthLayout.tsx', [
      route(URL_PATH.ADMIN.AUTH.LOGIN, 'routes/admin/auth/LoginPage.tsx'),
    ]),

    route(URL_PATH.ADMIN.AUTH.LOGOUT, 'routes/admin/auth/LogoutPage.tsx'),
  ]),

  layout('layouts/user/UserLayout.tsx', [
    layout('layouts/user/UserAppLayout.tsx', [route(URL_PATH.HOME, 'routes/user/home/Home.tsx')]),
  ]),

  // redirect page for githubpages
  route(URL_PATH.REDIRECT, 'routes/errors/RedirectPage.tsx'),

  // error page
  route(URL_PATH.ERROR.PAGE_403, 'routes/errors/403Page.tsx'),
  route(URL_PATH.ERROR.PAGE_500, 'routes/errors/500Page.tsx'),
  route(URL_PATH.ERROR.PAGE_503, 'routes/errors/503Page.tsx'),
  route(URL_PATH.ERROR.PAGE_404, 'routes/errors/404PageClone.tsx'),
  route('*', 'routes/errors/404Page.tsx'),
] satisfies RouteConfig;
