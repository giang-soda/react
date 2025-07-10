import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    base: env.VITE_BASE_URL || '/', // add subpath to url from env or default,
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:9999',
          changeOrigin: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
      watch: {
        ignored: [
          path.resolve(__dirname, 'data/**/*'),
          path.resolve(__dirname, 'pages-github/**/*'),
        ],
      },
    },
  };
});
