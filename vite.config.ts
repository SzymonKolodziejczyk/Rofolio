import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For a repository project site (username.github.io/repository/), set VITE_BASE=/repository/
// For a user site or custom domain, leave this at /.
export default defineConfig({ plugins: [react()], base: process.env.VITE_BASE || '/' });
