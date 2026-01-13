/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["Inter", "system-ui", "sans-serif"], // <- navbar font
      },
    },
  },
  plugins: [],
};