/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        GHKKengtung: ["GHKKengtung", "sans-serif"],
        GHKTachileik: ["GHKTachileik", "sans-serif"],
      },
      colors: {
        primary: "#ffffff",
        background: "#000000",
        foreground: "#1c1c1c",
        danger: "#F56565",
        blue: "#2563EB",
        green: "#22C55E",
      },
    },
  },
  plugins: [],
};
