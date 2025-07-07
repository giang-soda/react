import type { Config } from '@react-router/dev/config';
import { basename } from './app/lib/url';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  basename,
  prerender: async () => {
    // const paths = await getStaticPaths();
    return [
      "/",
      // ...paths,
      "/admin/dashboard",
      "/admin/users",
      // "/admin/users/create",
      // "/admin/users/1",
      // "/admin/editor/ckeditor",
      // "/admin/throw-error",
      // "/redirect",
    ];
  },
  // prerender: [
  //   '/',
  //   '/admin/dashboard',
  // ],
} satisfies Config;
