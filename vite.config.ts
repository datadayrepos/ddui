import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
      // ... other aliases
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'), // Entry point for your library
      name: 'YourLibName',
      formats: ['es'], // Only generate ESM format
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '@datadayrepos/usevuecore', '@datadayrepos/usevueshared'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        entryFileNames: 'index.js', // Set the output file name to index.js
        assetFileNames: 'index.css', // Set the output CSS file name to index.css
      },
    },
    assetsInlineLimit: 0, // Avoids asset hashing
    cssCodeSplit: false,
  },
})
