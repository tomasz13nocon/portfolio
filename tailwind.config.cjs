/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 13s linear infinite",
      },
      colors: {
        pri: {
          0: "#ABCC2C",
          1: "#E0F8D5",
          2: "#43C728",
          3: "#007900",
          4: "#005800",
          5: "#404A3B",
          6: "#0F0F0E",
        },
        sec: {
          // 0: "#FFD687",
          0: "#FFCD00",
          1: "#EDCF54",
          2: "#DD9F54",
          // 2: "#74662C",
          3: "#A26C21",
          4: "#865622",
        },
        ter: {
          0: "#FF5000",
          1: "#EFDDE2",
          2: "#D73714",
          3: "#FF0061",
          4: "#C72855",
          5: "#8B1C3C",
        },
      },
      backgroundColor: {
        bg: "hsl(110, 6%, 6%)",
      },
      backgroundImage: {
        gradient1: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
      },
    },
  },
  plugins: [],
};
