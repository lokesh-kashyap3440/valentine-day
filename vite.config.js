import { defineConfig } from 'vite'

// Use a relative base so the build works when served from a subpath (e.g., GitHub Pages)
export default defineConfig({
  base: './',
})
