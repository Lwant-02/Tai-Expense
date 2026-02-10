/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        KengTawng2: ["KengTawng2", "sans-serif"],
        NamTengWebPro: ["NamTengWebPro", "sans-serif"],
      },
      colors: {
        primary: "#ffffff",
        background: "#000000",
        foreground: "#1c1c1c",
      },
    },
  },
  plugins: [],
};
