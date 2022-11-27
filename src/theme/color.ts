const hsl = (h: number, s: number, l: number) => `hsl(${h}, ${s}%, ${l}%)`
const neutral = (lightness: number) => hsl(0, 0, lightness)
const primary = (lightness: number) => hsl(237, 50, lightness)
const secondary = (lightness: number) => hsl(193, 50, lightness)

export const tokens = {
  text: {
    default: neutral(85), // default text color
    muted: neutral(50), // text with less priority, e.g. when disabled
  },
  background: {
    base: neutral(15), // global (body) background
    surface: neutral(10), // background of surfaces above base, e.g. tiles
    input: neutral(5), // background of clickable input elements, e.g. buttons
    hover: neutral(2.5), // hover background of clickable input elements
  },
}

export const color = {
  primary: primary(50),
  secondary: secondary(50),
}
