const hsl = (h: number, s: number, l: number) => `hsl(${h}, ${s}%, ${l}%)`
const neutral = (lightness: number) => hsl(0, 0, lightness)
const primary = (lightness: number) => hsl(237, 50, lightness)
const secondary = (lightness: number) => hsl(193, 50, lightness)

export const tokens = {
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

export const color = {
  primary: primary(50),
  secondary: secondary(50),
}
