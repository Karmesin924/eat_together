/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        project: "#FF9900",
        buttoncolor: "#FFFFFF",
        buttonhover: "#FFCC66",
        homehover: "#FFE08C",
        buttonhovercolor: "#FF5E00",
        disabled: "#CCCCCC",
      },
    },
  },
  plugins: [],
};
