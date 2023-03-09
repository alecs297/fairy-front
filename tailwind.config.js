/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      mono: ['Inter var', ...defaultTheme.fontFamily.mono],
      serif: ['Inter var', ...defaultTheme.fontFamily.serif]
    },
    colors: {
      "bg-default": "#ffffff",
      "text-default": "#1e1e3e",
      "text-secondary": "#fd4929",
      "text-tertiary": "#834694"
    }
  },
  plugins: [],
}
