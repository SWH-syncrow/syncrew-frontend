/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      orange: {
        DEFAULT: "#FC773E",
        50: "#FFEEE7",
        100: "#FECAB4",
        200: "#FDB190",
        300: "#FC8D5E",
        400: "#FC773E",
        500: "#FB550E",
        600: "#E44D0D",
        700: "#B23C0A",
        800: "#8A2F08",
        900: "#1C1C1C",
      },
      grey: {
        DEFAULT: "#434343",
        0: "#F3F3F3",
        50: "#ECECEC",
        100: "#C5C5C5",
        200: "#A9A9A9",
        300: "#818181",
        400: "#696969",
        500: "#434343",
        600: "#3D3D3D",
        700: "#303030",
        800: "#252525",
        900: "#1C1C1C",
        bg: {
          50: "#FEFEFE",
          100: "#FDFCFB",
          200: "#FBFAF9",
          300: "#FAF8F6",
          400: "#F9F7F4",
          500: "#F7F5F1",
          600: "#E1DFDB",
          700: "#AFAEAB",
          800: "#888785",
          900: "#686765",
        },
      },
      red: {
        DEFAULT: "#D82518",
        1: "#FBE9E8",
        2: "#F6CBC8",
        3: "#EEA19C",
        4: "#E6766D",
        5: "#DF4C42",
        6: "#D82518",
        7: "#B81F14",
        8: "#991A11",
        9: "#7B150E",
        10: "#61110B",
      },
      white: { DEFAULT: "#FFFFFF" },
      black: { DEFAULT: "#000000" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
