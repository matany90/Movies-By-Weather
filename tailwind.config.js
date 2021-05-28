module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "m-bg": "#0E0D13",
        "m-warn": "#F2C94C",
        "m-error": "#D20000",
        "m-success": "#01D6AA",
        "m-primary": "#F1182D",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
