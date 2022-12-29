/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      accentpurple: "#5743D6",
      bgdark: "#0E0E0E",
      bgdarker: "#0A0A0A",
      bglight: "#242424",
      textlight: "#FFFFFF",
      textdark: "#D9D9D9",
      textdarker: "#868686",
      accentred: "#D03434"
    }
  },
  plugins: [],
}