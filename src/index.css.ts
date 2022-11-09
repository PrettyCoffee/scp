import { globalStyle } from "@vanilla-extract/css"

import { theme } from "./theme"

globalStyle(":root", {
  colorScheme: "light dark",
  backgroundColor: theme.tokens.background.default,
  color: theme.tokens.text.default,
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
