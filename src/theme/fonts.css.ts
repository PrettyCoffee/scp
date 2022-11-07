import { globalFontFace } from "@vanilla-extract/css"

export const quicksand = "Quicksand"
const fontUrl = (file: string) => `/fonts/${file}`

globalFontFace(quicksand, {
  fontStyle: "regular",
  fontWeight: "400",
  fontDisplay: "swap",
  src: fontUrl("Quicksand-Regular.ttf"),
})

globalFontFace(quicksand, {
  fontStyle: "medium",
  fontWeight: "500",
  fontDisplay: "swap",
  src: fontUrl("Quicksand-Medium.ttf"),
})

globalFontFace(quicksand, {
  fontStyle: "bold",
  fontWeight: "700",
  fontDisplay: "swap",
  src: fontUrl("Quicksand-Bold.ttf"),
})
