import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/vuejs-jobs-list-sample-2024",
  server: {
    port: 3000,

    //instead of using localhost you must use api to handle it.
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        //replace localhost to /api
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
