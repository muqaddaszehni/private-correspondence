import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base: './'` keeps asset URLs relative so the build works both at the root
// (local dev / preview) and under a GitHub Pages project subpath
// (https://<user>.github.io/<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
