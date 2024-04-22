import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#0348FA",
				error: "#EC2323",
				black: "#171717",
				gray: "#767676",
				white: "#FFFFFF",
			},
			fontSize: {
				"18px": "18px",
				"24px": "24px",
				"28px": "28px",
				"32px": "32px",
			},
		},
	},
	plugins: [],
};
export default config;
