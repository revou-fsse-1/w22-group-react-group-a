/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "main-purple": "#635FC7",
      "main-purple-hover": "#A8A4FF",

      "white-custom": "#FFFFFF",
      "black-custom": "#000112",
      "black-overlay": "rgba(0, 0, 0, 0.5)",
      "red-custom": "#EA5555",
      "red-custom-hover": "#FF9898",

      "medium-grey": "#828FA3",
      "dark-grey": "#2B2C37",
      "very-dark-grey": "#20212C",

      "lines-dark": "#3E3F4E",
      "lines-light": "#E4EBFA",
      "light-grey": "#F4F7FD",
    },
    fontFamily: {
      jakarta: ["Plus Jakarta Sans"],
    },
    fontSize: {
      "heading-xl": [
        "24px",
        {
          lineHeight: "30px",
          fontWeight: "700",
        },
      ],
      "heading-lg": [
        "18px",
        {
          lineHeight: "23px",
          fontWeight: "700",
        },
      ],
      "heading-md": [
        "15px",
        {
          lineHeight: "19px",
          fontWeight: "700",
        },
      ],
      "heading-sm": [
        "12px",
        {
          lineHeight: "15px",
          fontWeight: "700",
          letterSpacing: "2.4px",
        },
      ],
      "body-lg": [
        "13px",
        {
          lineHeight: "23px",
          fontWeight: "500",
        },
      ],
      "body-md": [
        "12px",
        {
          lineHeight: "15px",
          fontWeight: "700",
        },
      ],
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
