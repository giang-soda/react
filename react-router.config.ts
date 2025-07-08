import type { Config } from '@react-router/dev/config';
import { basename } from './app/lib/url';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  basename: '/',
  prerender: async ({getStaticPaths}) => {
    const paths = await getStaticPaths();

    // const userIds = [1,2];
    // const userPaths = userIds.map(id => `/admin/users/${id}`);

    return [
      "/",
      ...paths,
      // ...userPaths,
    ];
  },
} satisfies Config;
