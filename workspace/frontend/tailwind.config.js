/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Ensure Tailwind applies to all pages
    './components/**/*.{js,ts,jsx,tsx}', // Ensure Tailwind applies to all components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
