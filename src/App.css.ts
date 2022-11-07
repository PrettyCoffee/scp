import { globalStyle, keyframes, style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"

globalStyle(".App", {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "2rem",
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
    height: "6em",
    margin: "1.5em",
    willChange: "filter",
    transition: "0.2s",
    selectors: {
      "a:hover &, a:focus &, a:focus-visible &": {
        filter: `drop-shadow(0 0 2em var(${logoColor}))`,
      },
    },
  },
  variants: {
    tool: {
      vite: {
        vars: { [logoColor]: "#646cffaa" },
      },
      react: {
        vars: { [logoColor]: "#61dafbaa" },
        animation: `${logoSpin} infinite 20s linear`,
      },
    },
  },
})

export const card = style({
  padding: "2em",
})

export const readTheDocs = style({
  color: "#888",
})

export const button = style({
  borderRadius: "8px",
  border: "1px solid transparent",
  padding: "0.6em 1.2em",
  fontSize: "1em",
  fontWeight: 500,
  fontFamily: "inherit",
  backgroundColor: "#1a1a1a",
  cursor: "pointer",
  transition: "border-color 0.25s",

  selectors: {
    "&:focus, &:focus-visible": {
      outline: "2px solid #646cff",
    },
    "&:hover": {
      borderColor: "#646cff",
    },
  },

  "@media": {
    "(prefers-color-scheme: light)": {
      backgroundColor: "#f9f9f9",
    },
  },
})
