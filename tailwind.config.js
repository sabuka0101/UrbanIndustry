/** @type {import('tailwindcss').Config} */
import fontFamily from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        estedad: ["Estedad"],
      },
    },
  },
  plugins: [],
};
