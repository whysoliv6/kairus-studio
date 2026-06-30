import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/kairus-studio/',
  plugins: [react()],
  server: {
    port: 5173,
    open: '/react.html',
  },
})
