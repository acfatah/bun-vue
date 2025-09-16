import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  root: './src/app',
  publicDir: './src/app/public',

  build: {
    outDir: 'dist/app',
  },

  plugins: [
    vue(),
    tailwindcss(),
    svgLoader(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/registry'),
    },
  },
})
