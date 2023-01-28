import Color from "color"

import { fontStyles, Icon, IconProps } from "../primitives"

const opacity = (color: string, opacity: number) =>
  Color(color).alpha(opacity).string()

const ButtonBase = styled.button<Pick<ButtonProps, "look">>(
  ({
    theme,
    theme: { border, space, tokens, color, raw },
    look = "default",
  }) => css`
    ${fontStyles({ theme, color: look === "danger" ? "danger" : "default" })}

    height: ${space.lg};
    min-height: ${space.lg};
    padding: 0 ${space.sm};

    display: inline-flex;
    align-items: center;
    gap: ${space.sm};

    border-radius: ${space.sm};
    cursor: pointer;
    border: ${border};

    border-color: transparent;
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
      border-color: ${color.red};
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

interface ButtonProps {
  caption: string
  onClick?: () => void
  icon?: IconProps["icon"]
  look?: "default" | "danger"
}

export const Button = ({ caption, icon, ...props }: ButtonProps) => (
  <ButtonBase {...props}>
    {caption}
    {icon && <Icon icon={icon} />}
  </ButtonBase>
)
