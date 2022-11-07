import { globalStyle } from "@vanilla-extract/css"

import { quicksand } from "./fonts.css"

const font = `${quicksand} , sans-serif`

globalStyle("html, body, #root", {
  height: "100%",
  width: "100%",
  margin: "0",
})

globalStyle(":root", {
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",

  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
})

globalStyle("body", {
  minHeight: "100%",
  minWidth: "100%",
  overflow: "hidden",

  font: `500 1rem ${font}, sans-serif`,
  lineHeight: 1.5,
})

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
})

globalStyle("input, button, textarea, select", {
  font: "inherit",
  color: "currentColor",
  outline: "none",
})

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
  outline: "none",
})

/* Keyboard focus debugging
globalStyle("*:focus-visible", {
  outline: "2px solid red !important",
})
*/
