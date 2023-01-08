export const color = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
}

export const tokens = {
  accent: color.blue,
  text: {
    default: "#CDD6F4", // default text color
    muted: "#7F849C", // text with less priority, e.g. when disabled
  },
  background: {
    base: "#1E1E2E", // global (body) background
    surface: "#11111B", // background of surfaces above base, e.g. tiles
    alt: "#181825", // alternative surface

    input: "#313244", // background of clickable input elements, e.g. buttons
    hover: "#45475A", // hover background of clickable input elements
    press: "#585B70", // background of input elements while pressing
  },
}
