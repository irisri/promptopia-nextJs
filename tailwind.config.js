/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        akshar: ["Akshar", "sans-serif"],
      },
      colors: {
        amaranth: "#E63946",
        "off-white": "#F1FAEE",
        "off-white-50": "#B5BBB4",
        "jelly-bean": "#457B9D",
        "black-90": "#1E1E24",
      },
    },
  },
  plugins: [],
};
