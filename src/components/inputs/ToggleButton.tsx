import { Root } from "@radix-ui/react-toggle"

import { Icon, IconDefinition, VisuallyHidden } from "../primitives"
import { ButtonStyleProps, buttonStyles } from "./utils/buttonStyles"

const Toggle = styled(Root)<ButtonStyleProps>(
  ({ theme, theme: { tokens }, look }) => css`
    ${buttonStyles({ theme, look })}

    &[data-state="on"] {
      color: ${tokens.accent};
    }
  `
)

interface ToggleButtonProps extends ButtonStyleProps {
  icon: IconDefinition
  caption: string
  pressed: boolean
  onClick: (pressed: boolean) => void
}

export const ToggleButton = ({
  caption,
  icon,
  onClick,
  ...rest
}: ToggleButtonProps) => (
  <Toggle onPressedChange={onClick} {...rest}>
    <Icon icon={icon} size="md" />
    <VisuallyHidden>{caption}</VisuallyHidden>
  </Toggle>
)
