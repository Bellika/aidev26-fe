import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['aidev26-fe-production.up.railway.app'],
  },
  server: {
    allowedHosts: ['aidev26-fe-production.up.railway.app'],
  },
})
