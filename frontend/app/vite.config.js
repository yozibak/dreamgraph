import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['VITE_API_ENDPOINT', 'VITE_API_KEY'])],
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  preview: {
    port: 3000,
  }
})
