import { ThemeProp } from "../../base"

interface BorderProps {
  color?: "default" | "muted" | "danger" | "none"
}

export const inputBorder = ({
  theme: {
    space,
    tokens,
    border,
    color: { red },
  },
  color = "default",
}: ThemeProp & BorderProps) => {
  const colorIsDominant = color === "danger" || color === "none"
  return css`
    border-radius: ${space.sm};
    border: ${border} transparent;
    border-color: ${color === "danger"
      ? red
      : color === "none"
      ? "transparent"
      : tokens.text[color]};

    &:focus-visible {
      border-color: ${!colorIsDominant && tokens.accent};
    }
  `
}
