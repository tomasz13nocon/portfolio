/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
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
