import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: (id) => {
        return id.includes('react-icons/fa') || id.includes('node_modules');
      }
    }
  },
  optimizeDeps: {
    include: ['react-icons/fa']
  }
});