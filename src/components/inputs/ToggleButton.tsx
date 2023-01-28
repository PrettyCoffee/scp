import { Root } from "@radix-ui/react-toggle"

import { Icon, IconProps, VisuallyHidden } from "../primitives"
import { ErrorBoundary } from "../utility"
import { ButtonStyleProps, iconButtonStyles } from "./utils/iconButtonStyles"

const Toggle = styled(Root)<ButtonStyleProps>(
  ({ theme, theme: { tokens }, look }) => css`
    ${iconButtonStyles({ theme, look })}

    &[data-state="on"] {
      color: ${tokens.accent};
    }
  `
)

interface ToggleButtonProps
  extends Pick<IconProps, "icon" | "fill">,
    ButtonStyleProps {
  caption: string
  pressed: boolean
  onClick: (pressed: boolean) => void
}

export const ToggleButton = ({
  caption,
  icon,
  onClick,
  fill,
  ...rest
}: ToggleButtonProps) => (
  <ErrorBoundary>
    <Toggle title={caption} onPressedChange={onClick} {...rest}>
      <Icon icon={icon} fill={fill} size="md" />
      <VisuallyHidden>{caption}</VisuallyHidden>
    </Toggle>
  </ErrorBoundary>
)
