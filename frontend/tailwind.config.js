/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Add custom colors, spacing, fonts, etc. here
    },
  },
  plugins: [
    // Add Tailwind plugins here (e.g., require('@tailwindcss/forms'))
  ],
};
