import { Root } from "@radix-ui/react-toggle"

import { Icon, IconDefinition, VisuallyHidden } from "../primitives"
import { buttonStyles } from "./utils/buttonStyles"

const Toggle = styled(Root)(
  ({ theme, theme: { tokens } }) => css`
    ${buttonStyles({ theme })}

    &[data-state="on"] {
      color: ${tokens.accent};
    }
  `
)

interface ToggleButtonProps {
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
