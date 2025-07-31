/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ← enable dark mode with 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6366f1",
          dark: "#8b5cf6",
          heading: "#000",
          backDrop: "#fff",
          subHeading: "#4b5563",
          brandColor1: "#4f46e5",
          brandColor1Hover: "#6366f1",
          logo: "#000",
        },
        dark: {
          heading: "#ffffff",
          backDrop: "#000",
          accent: "#141414",
          subHeading: "#d1d5db",
          logo: "#fff",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
