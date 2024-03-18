/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				workspace: "#0c111a"
			}
		}
	},
	plugins: [require("daisyui")]
};
