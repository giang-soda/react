import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  // option more ckeditor
  // optimizeDeps: {
  //   include: [
  //     '@ckeditor/ckeditor5-react'
  //   ]
  // },
  // build: {
  //   commonjsOptions: {
  //     transformMixedEsModules: true
  //   }
  // }
  // end option more ckeditor
});
