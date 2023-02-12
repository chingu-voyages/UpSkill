/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#265B8B",
        ivory: {
          50: "#DCDBDB",
          75: "#D9D9D9",
          100: "#ECECEB",
          200: "#656567",
          300: "#B0B0AF",
        },
        modalBg: "#dcdbdbb7",
        rocketBg: "#23445B",
        baby: "#84C7F2",
        grotto: { 100: "#1181C8", 200: "#1d4ed8" },
        winkle: "#BFC7F2",
        tokebgColor: "#F27457",
        cardBg: "#FAFAFA",
        myChat: "#cafaf1",
      },
      fontFamily: {
        title: ["Quicksand", "Open Sans"],
        body: ["Open Sans", "Avenir"],
      },
      width: {
        dashSKillsSection: "24.625rem",
        dashScheduleSection: "55.125rem",
        smalldashsch: "22.125rem",
      },
      gap: {
        spaceBtwbioXScheduledLssn: "4.875rem",
      },
      fontSize: {
        note: ".5rem",
      },
      boxShadow: {
        cardSh: "2px 2px 7px rgba(0, 0, 0, 0.25)",
      },
      height: {
        chatScreenHeight: "calc(100vh - 5rem)",
      },
    },
  },
  plugins: [],
};
