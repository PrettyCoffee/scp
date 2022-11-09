import { globalStyle, keyframes, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { recipe } from "@vanilla-extract/recipes"

import { theme } from "./theme"

const { color, tokens, space, border } = theme

globalStyle(".App", {
  maxWidth: 1280,
  margin: "0 auto",
  padding: space.lg,
  textAlign: "center",
})

const logoSpin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const logoColor = "--logo-color"

export const logo = recipe({
  base: {
    height: calc.multiply(space["xxl"], 2),
    padding: space.md,
    willChange: "filter",
    transition: "0.2s",
    selectors: {
      "a:hover &, a:focus &, a:focus-visible &": {
        filter: `drop-shadow(0 0 ${space.lg} var(${logoColor}))`,
      },
    },
  },
  variants: {
    tool: {
      vite: {
        vars: { [logoColor]: color.primary },
      },
      react: {
        vars: { [logoColor]: color.secondary },
        animation: `${logoSpin} infinite 20s linear`,
      },
    },
  },
})

export const card = style({
  padding: space.lg,
})

export const readTheDocs = style({
  color: tokens.text.muted,
})

export const button = style({
  borderRadius: "8px",
  border: border.primary,
  borderColor: "transparent",
  padding: `${space.sm} ${space.md}`,
  fontSize: space.md,
  fontWeight: 500,
  fontFamily: "inherit",
  backgroundColor: tokens.background.input,
  cursor: "pointer",
  transition: "border-color 0.25s",

  selectors: {
    "&:focus, &:focus-visible": {
      outline: `${space.xxs} solid ${color.primary}`,
      backgroundColor: tokens.background.hover,
    },
    "&:hover": {
      backgroundColor: tokens.background.hover,
      borderColor: color.primary,
    },
  },
})
