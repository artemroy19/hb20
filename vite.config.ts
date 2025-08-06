import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hb/', // Критически важно для корректных путей на GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // Явно указываем выходную директорию
    assetsDir: 'assets', // Опционально: для организации ассетов
  }
});