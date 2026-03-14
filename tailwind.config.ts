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
        background: '#fafafa',
        foreground: '#111111',
        accent: '#00d4aa',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
