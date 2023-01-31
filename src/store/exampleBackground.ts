import { cssTheme, theme } from "../theme"
import { Background } from "./General"

const base = cssTheme.tokens.background.base

export const solidBg: Background<"solid"> = {
  type: "solid",
  base: cssTheme.tokens.background.base,
}

export const heroPatternBg: Background<"pattern"> = {
  type: "pattern",
  base: base,
  height: 96,
  width: 60,
  scale: 1,
  pathColor: theme.tokens.accent,
  opacity: 0.25,
  path: "M36 10a6 6 0 0 1 12 0v12a6 6 0 0 1-6 6 6 6 0 0 0-6 6 6 6 0 0 1-12 0 6 6 0 0 0-6-6 6 6 0 0 1-6-6V10a6 6 0 1 1 12 0 6 6 0 0 0 12 0zm24 78a6 6 0 0 1-6-6 6 6 0 0 0-6-6 6 6 0 0 1-6-6V58a6 6 0 1 1 12 0 6 6 0 0 0 6 6v24zM0 88V64a6 6 0 0 0 6-6 6 6 0 0 1 12 0v12a6 6 0 0 1-6 6 6 6 0 0 0-6 6 6 6 0 0 1-6 6z",
}

export const heroPatternBg2: Background = {
  ...heroPatternBg,
  height: 40,
  width: 40,
  path: "M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z",
}

export const imageBg: Background = {
  type: "image",
  base,
  opacity: 0.25,
  src: "https://3.bp.blogspot.com/--XA3iMvaJLY/Tw_GykPs-eI/AAAAAAAAEgU/EmFKS7Cz5xQ/s1600/Duck-04.jpg",
  filter: "blur(8px)",
}

export const customBg: Background = {
  type: "custom",
  base,
  css: `
    background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5));
    filter: blur(80px);
  `,
}
