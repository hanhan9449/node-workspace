import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
        "main-page": resolve(__dirname, 'src/pages/main-page/index.html'),
        "manifest-edge": resolve(__dirname, 'src/manifests/edge.ts'),
        'manifest-chrome': resolve(__dirname, 'src/manifests/chrome.ts'),
        background: resolve(__dirname, 'src/background.ts')
      }
    }
  }
})
