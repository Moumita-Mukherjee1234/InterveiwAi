module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--indigo-deep)",
        teal: "var(--teal)",
        coral: "var(--coral-red)",
        mustard: "var(--mustard)",
      },
    },
  },
  plugins: [],
};