/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["retro", "lemonade", "autumn", "cupcake", "valentine", "nord"],
    base: true,
    styled: true,
    utils: true,
  },
}