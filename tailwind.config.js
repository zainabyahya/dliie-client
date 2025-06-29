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
    animation: {
      fadeIn: "fadeIn 0.4s ease-out",
      planeFlight: "planeFlight 1.2s ease-in-out infinite",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      planeFlight: {
        "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
        "50%": { transform: "translateY(-10px) rotate(-8deg)" },
      },
    },
  },
  plugins: [],
}

