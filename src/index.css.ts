import { globalStyle } from "@vanilla-extract/css"

globalStyle(":root", {
  fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: 400,

  colorScheme: "light dark",
  color: "rgba(255, 255, 255, 0.87)",
  backgroundColor: "#242424",

  fontSynthesis: "none",
  textRendering: "optimizeLegibility",

  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  WebkitTextSizeAdjust: "100%",

  "@media": {
    "(prefers-color-scheme: light)": {
      color: "#213547",
      backgroundColor: "#ffffff",
    },
  },
})

globalStyle("body", {
  margin: 0,
  display: "flex",
  placeItems: "center",
  minWidth: "320px",
  minHeight: "100vh",
})

globalStyle("h1", {
  fontSize: "3.2em",
  lineHeight: 1.1,
})
