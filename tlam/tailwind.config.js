/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        mbl: { max: "630px" },
      },
      fontFamily: {
        robotoFont: "Roboto Slab, sans-serif",
        oswaldFont: "Oswald, sans-serif",
      },
    },
  },
  plugins: [],
};
