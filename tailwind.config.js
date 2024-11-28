/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  theme: {
    colors: {
      green: "#CDDC39",
      darkgreen: "#4CAF50",
      white: "#FFFFFF",
      black: "#000000",
    },
    fontFamily: {
      sans: ["monospace"],
    },
  },
};
