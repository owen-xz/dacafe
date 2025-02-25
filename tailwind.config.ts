module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C19977",
        secondary: "rgb(153, 153, 153)",
        bg: "rgb(245, 245, 245)",
        bgDark: "rgb(35, 35, 35)",
      },
    },
  },
  plugins: [],
};
