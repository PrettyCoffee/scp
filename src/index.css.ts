import { globalStyle } from "@vanilla-extract/css"

globalStyle(":root", {
  colorScheme: "light dark",
  color: "rgba(255, 255, 255, 0.87)",
  backgroundColor: "#242424",

  "@media": {
    "(prefers-color-scheme: light)": {
      color: "#213547",
      backgroundColor: "#ffffff",
    },
  },
})

globalStyle("#root", {
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
