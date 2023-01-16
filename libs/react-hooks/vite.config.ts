import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path';
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(
    {insertTypesEntry: true}
  )],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'publicApi.ts'),
      name: 'publicApi',
      fileName: 'publicApi'
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  }
})
