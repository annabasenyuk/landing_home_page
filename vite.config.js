import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path';

export default defineConfig({
  base: '/landing_home_page/',
  plugins: [
    vue(),
    svgLoader()
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
})
