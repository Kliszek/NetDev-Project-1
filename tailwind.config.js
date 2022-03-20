module.exports = {
  mode: "jit",
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('/img/banner.jpg')"
      },
      fontFamily: {
        'rubik': ['Rubik'],
        'josefin': ['Josefin Sans']
      }
    },
  },
  plugins: [],
}