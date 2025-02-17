/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], theme: {
    extend: {
      colors: {
        primary: "#3D5A80",
        secondary: "#EE6C4D",
        font: "#293241",
        tertiary: "#98C1D9",
        beige: "#FDF0D5",
        light: "#E9FDFE"
      },
    },
  },
  plugins: [],
}

