import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9f9f7',
        foreground: '#1a1a1a',
        accent: '#00d4aa',
        'text-primary': '#1a1a1a',
        'text-secondary': '#6b6b6b',
        'text-tertiary': '#a0a0a0',
        'card-border': '#e8e8e6',
        divider: '#ebebeb',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
