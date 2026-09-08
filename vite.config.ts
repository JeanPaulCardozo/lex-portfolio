import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
// `base` se ajusta en el deploy a GitHub Pages mediante la variable VITE_BASE
// (p. ej. "/lex-portfolio/"). En local queda en "/".
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    port: 5173,
    // Alternativa al CORS al integrar tu API: descomenta y ajusta el target.
    // proxy: { '/api': { target: 'http://localhost:8000', changeOrigin: true } },
  },
})
