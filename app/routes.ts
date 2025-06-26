import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  layout('layouts/AppLayout.tsx', [
    index('routes/dashboard/index.tsx'), // home
    route('/dashboard', 'routes/dashboard/Dashboard.tsx'),
    route('/throw-error', 'routes/dashboard/ThrowError.tsx'),

    // TODO demo router
    route('/users', 'routes/users/List.tsx'),
    route('/users/create', 'routes/users/Create.tsx'),
    route('/users/:id', 'routes/users/Edit.tsx'),

    route('/call-api', 'routes/dashboard/CallApi.tsx'),
    route('/call-api-hook', 'routes/dashboard/CallApiHook.tsx'),
  ]),

  layout('layouts/AuthLayout.tsx', prefix('/auth', [route('/login', 'routes/auth/Login.tsx')])),

  // error page
  route('/403', 'routes/errors/403.tsx'),
  route('/500', 'routes/errors/500.tsx'),
  route('/503', 'routes/errors/503.tsx'),
  route('*', 'routes/errors/404.tsx'),
] satisfies RouteConfig;
