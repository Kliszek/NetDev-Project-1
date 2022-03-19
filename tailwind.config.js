module.exports = {
  mode: "jit",
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('/img/banner.jpg')"
      }
    },
  },
  plugins: [],
}