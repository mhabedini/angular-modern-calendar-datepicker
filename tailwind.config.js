/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IRANSansXFaNum', 'sans-serif'],
        sansFaEn: ['IRANSansX', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

