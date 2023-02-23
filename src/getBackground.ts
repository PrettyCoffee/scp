import { Background, PatternBackground } from "./store"

const escapeString = (value: string) =>
  value
    .replaceAll("<", "%3C")
    .replaceAll(">", "%3E")
    .replaceAll("#", "%23")
    .replaceAll(/\s+/gi, " ")

const getHeroPattern = ({
  pathColor,
  path,
  height,
  width,
  scale,
}: PatternBackground) =>
  escapeString(
    `url("data:image/svg+xml,
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='${(width * scale) / 100}'
        height='${(height * scale) / 100}'
        viewBox='0 0 ${width} ${height}'
      >
        <path
          fill='${pathColor}'
          fill-opacity='1'
          d='${path}'
        />
      </svg>
    ")`
  )

interface BgConfig {
  type: Background["type"]
  base: string
  opacity?: number
  image?: string
  filter?: string
  cssString?: string
}

export const normalizeBackground = (bg: Background): BgConfig => {
  const shared = {
    type: bg.type,
    base: bg.base,
  }
  if (bg.type === "solid") return shared

  if (bg.type === "image")
    return {
      ...shared,
      opacity: bg.opacity / 100,
      image: `url("${bg.src}")`,
      filter: bg.filter,
    }

  if (bg.type === "pattern")
    return {
      ...shared,
      opacity: bg.opacity / 100,
      image: getHeroPattern(bg),
    }

  return {
    ...shared,
    cssString: bg.css,
  }
}

export const getBackground = (bg: Background) => {
  const { type, base, filter, image, opacity, cssString } =
    normalizeBackground(bg)

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

    ${cssString}
    }
  `
}
