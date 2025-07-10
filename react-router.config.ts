import type { Config } from '@react-router/dev/config';
import { URL_PATH } from './app/constans';
import { loadDataListLink } from './app/lib/server/loader';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  basename: '/',
  prerender: async ({getStaticPaths}) => {
    const paths = await getStaticPaths();

    const postPaths = loadDataListLink('posts').map(link => URL_PATH.ADMIN.POSTS.DETAIL(link));

    return [
      "/",
      ...paths,
      ...postPaths,
    ];
  },
} satisfies Config;
