import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  layout('layouts/AppLayout.tsx', [
    index('routes/home.tsx'),
    route('dashboard', 'routes/dashboard/index.tsx'),
  ]),

  layout('layouts/AuthLayout.tsx', prefix('auth', [route('login', 'routes/auth/Login.tsx')])),
] satisfies RouteConfig;
