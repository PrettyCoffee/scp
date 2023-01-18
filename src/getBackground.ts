import { Background } from "./store/General"

interface BgConfig {
  type: Background["type"]
  base: string
  opacity?: number
  image?: string
  filter?: string
}

export const normalizeBackground = (bg: Background): BgConfig => {
  const shared = {
    type: bg.type,
    base: bg.base,
  }
  if (bg.type === "solid") return shared

  return {
    ...shared,
    opacity: bg.opacity,
    image: `url("${bg.src}")`,
    filter: bg.filter,
  }
}

export const getBackground = (bg: Background) => {
  const { type, base, filter, image, opacity } = normalizeBackground(bg)

  if (type === "solid")
    return css`
      background-color: ${base};
    `

  return css`
    background-color: ${base};
    ::before {
      content: "";
      position: absolute;
      inset: 0;
      height: 100%;
      width: 100%;
      background-position: center;

      ${type === "image" && "background-size: cover;"}

      ${filter && `filter: ${filter};`}
      ${opacity && `opacity: ${opacity};`}
      ${image && `background-image: ${image};`}
    }
  `
}
