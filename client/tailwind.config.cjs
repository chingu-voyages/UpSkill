/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      colors: {
        rocketBg: "#23445B",
        primary: "#265B8B",
        ivory: "#ECECEB",
        baby: "#84C7F2",
        grotto: "#1181C8",
        winkle: "#BFC7F2",
      },
      fontFamily: {
        title: [ "Quicksand", "Open Sans" ],
        body: [ "Open Sans", "Avenir" ],
      },
    },
  },
  plugins: [],
};
