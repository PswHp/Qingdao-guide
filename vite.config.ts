import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // npm run dev:api (wrangler, 8788) 로 띄운 Hono API 로 프록시
    proxy: { '/api': 'http://localhost:8788' },
  },
})
