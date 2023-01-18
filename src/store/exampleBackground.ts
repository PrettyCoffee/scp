import { cssTheme } from "../theme"
import { Background } from "./General"

const base = cssTheme.tokens.background.base

export const solidBg: Background = {
  type: "solid",
  base: cssTheme.tokens.background.base,
}

export const imageBg: Background = {
  type: "image",
  base,
  opacity: 0.25,
  src: "https://3.bp.blogspot.com/--XA3iMvaJLY/Tw_GykPs-eI/AAAAAAAAEgU/EmFKS7Cz5xQ/s1600/Duck-04.jpg",
  filter: "blur(8px)",
}
