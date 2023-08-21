import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            external: ['better-sqlite3', 'mysql2/promise', 'write-file-atomic']
        }
    },
	optimizeDeps: {
		exclude: ["quick.db"]
	  },
    plugins: [sveltekit()]
});