/** @type {import('tailwindcss').Config} */

module.exports = {
   content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: '#c667e0',
      background: '#fbfffe',
      white: '#fbfffe',
      black: '#252525',
      secondary: '#fada89',
      pink: '#e7aaf8',
      darkGray: '#3d3d3d',
    },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}

