/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'selector',
  content: ["./projects/**/*.{html,js,sass}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IRANSansXFaNum', 'sans-serif'],
        sans_en: ['IRANSansX', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}

