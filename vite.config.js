import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() , eslint()],
  resolve: {
    alias: {
      'firebase/auth$': 'firebase/auth/dist/index.esm.js',
      'firebase/firestore$': 'firebase/firestore/dist/index.esm.js',
    },
  },

})
