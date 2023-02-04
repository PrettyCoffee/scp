import Color from "color"

import { fontStyles, Icon, IconProps } from "../primitives"
import { ErrorBoundary } from "../utility"
import { inputBorder } from "./utils/inputBorder"

const opacity = (color: string, opacity: number) =>
  Color(color).alpha(opacity).string()

const ButtonBase = styled.button<Pick<ButtonProps, "look">>(
  ({ theme, theme: { border, space, tokens, raw }, look = "default" }) => css`
    ${fontStyles({ theme, color: look === "danger" ? "danger" : "default" })}
    ${inputBorder({ theme, color: "none" })}

    height: ${space.lg};
    min-height: ${space.lg};
    padding: 0 ${space.sm};

    display: inline-flex;
    align-items: center;
    gap: ${space.sm};

    cursor: pointer;

    background-color: ${tokens.background.input};
    &:focus-visible {
      outline: ${border} ${tokens.accent};
    }

    &:hover,
    &:focus-visible {
      background-color: ${tokens.background.hover};
    }
    &:active {
      background-color: ${tokens.background.press};
    }

    ${look === "danger" &&
    css`
      ${inputBorder({ theme, color: "danger" })}
      background-color: transparent;

      &:focus-visible {
        outline: none;
      }

      &:hover,
      &:focus-visible {
        background-color: ${opacity(raw.color.red, 0.1)};
      }
      &:active {
        background-color: ${opacity(raw.color.red, 0.2)};
      }
    `}
  `
)

export interface ButtonProps {
  caption: string
  onClick?: () => void
  icon?: IconProps["icon"]
  look?: "default" | "danger"
}

export const Button = ({ caption, icon, ...props }: ButtonProps) => (
  <ErrorBoundary>
    <ButtonBase {...props}>
      {caption}
      {icon && <Icon icon={icon} />}
    </ButtonBase>
  </ErrorBoundary>
)
