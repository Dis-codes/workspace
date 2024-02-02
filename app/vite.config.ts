import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		target: "esnext",
		rollupOptions: {
			external: ["better-sqlite3", "mysql2/promise", "write-file-atomic"]
		}
	},
	optimizeDeps: {
		exclude: ["quick.db"]
	},
	plugins: [sveltekit()]
});
