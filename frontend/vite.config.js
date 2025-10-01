import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    proxy: {
      '/api': {
        target: "https://kayanirani-chatbotrag.hf.space",
        changeOrigin: true,
        secure: true
      }
    }
  }
})
