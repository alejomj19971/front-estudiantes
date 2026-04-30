import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@domain': resolve(__dirname, 'src/domain'),
      '@presentation': resolve(__dirname, 'src/presentation'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@tests': resolve(__dirname, 'src/tests'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-ui': ['lucide-react'],
          'vendor-forms': ['react-hook-form', 'zod'],
          'vendor-state': ['zustand'],
        },
      },
    },
  },
})
