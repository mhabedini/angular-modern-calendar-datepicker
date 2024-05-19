/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'selector',
  content: ["./projects/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IRANSansXFaNum', 'sans-serif'],
        sans_en: ['IRANSansX', 'sans-serif'],
      },
    },
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      ...colors,
    }
  },
  plugins: [],
}

