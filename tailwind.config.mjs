/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-mode:"dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/notes/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
