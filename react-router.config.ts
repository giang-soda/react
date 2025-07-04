import type { Config } from '@react-router/dev/config';
import { basename } from './app/lib/url';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  basename,
} satisfies Config;
