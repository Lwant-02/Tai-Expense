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
        primary: "#1E3A8A",
        secondary: "#93C5FD",
        background: "#0B1220",
        text: "#E5E7EB",
        accent: "#2563EB",
      },
    },
  },
  plugins: [],
};
