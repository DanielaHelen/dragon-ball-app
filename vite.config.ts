/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    environmentOptions: {
      url: "http://localhost",
    },
    include: ["**/*.test.js", "**/*.test.ts", "**/*.test.jsx", "**/*.test.tsx"],
    exclude: ["**/node_modules/**"],
    setupFiles: ['./config/vitest-setup.ts'],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  }
})
