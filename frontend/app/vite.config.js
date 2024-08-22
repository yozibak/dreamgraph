import path from "path"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['API_ENDPOINT', 'USER_POOL_CLIENT_ID', 'USER_POOL_ID'])],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          aws: ['aws-amplify', '@aws-amplify/ui-react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})
