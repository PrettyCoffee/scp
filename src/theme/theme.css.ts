import { createTheme } from "@vanilla-extract/css"

import { quicksand } from "./fonts.css"

const space = {
  "3xs": "0.0625rem",
  xxs: "0.125rem",
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "2rem",
  xl: "3rem",
  xxl: "4rem",
  "3xl": "5rem",
}

const hsl = (h: number, s: number, l: number) => `hsl(${h}, ${s}%, ${l}%)`
const neutral = (lightness: number) => hsl(0, 0, lightness)
const primary = (lightness: number) => hsl(237, 50, lightness)
const secondary = (lightness: number) => hsl(193, 50, lightness)

const border = (color: string) => `${space.xxs} solid ${color}`

const tokens = {
  text: {
    default: neutral(85),
    muted: neutral(50),
  },
  background: {
    default: neutral(10),
    input: neutral(5),
    hover: neutral(2.5),
  },
}

const color = {
  primary: primary(50),
  secondary: secondary(50),
}

export const [themeClass, theme] = createTheme({
  space,
  color,
  tokens,
  border: {
    neutral: border(tokens.text.default),
    primary: border(color.primary),
    secondary: border(color.secondary),
  },
  font: `${quicksand} , sans-serif`,
})
