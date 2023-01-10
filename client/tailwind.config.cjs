/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#265B8B",
        ivory: {
          100: "#ECECEB",
          200: "#656567",
          300: "#B0B0AF",
        },
        baby: "#84C7F2",
        grotto: { 100: "#1181C8", 200: "#1d4ed8" },
        winkle: "#BFC7F2",
      },
      fontFamily: {
        title: ["Quicksand", "Open Sans"],
        body: ["Open Sans", "Avenir"],
      },
    },
  },
  plugins: [],
};
