/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'selector',
  content: ["./projects/**/*.{html,js,sass}", "./dist/angular-modern-calendar-datepicker/**/*.{html,ts,js,sass}", "./projects/angular-modern-calendar-datepicker/src/lib/components/**/*.{js,json,ts,sass,html}"],
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

