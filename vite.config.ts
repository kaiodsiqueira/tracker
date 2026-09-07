import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/confi
export default defineConfig({
  plugins: [react(), tailwindcss() ],
})
