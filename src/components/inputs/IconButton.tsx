import { ButtonStyleProps, iconButtonStyles } from "./utils/iconButtonStyles"
import { RefProp } from "../base"
import { Icon, IconProps, VisuallyHidden } from "../primitives"
import { ErrorBoundary } from "../utility"

const Button = styled.button<ButtonStyleProps>`
  ${iconButtonStyles}
  text-decoration: none;
`

interface IconButtonProps
  extends Pick<IconProps, "icon" | "fill">,
    RefProp,
    ButtonStyleProps {
  caption: string
  onClick?: () => void
  href?: string
  target?: "_self" | "_blank"
}

export const IconButton = ({
  caption,
  icon,
  setRef,
  fill,
  ...rest
}: IconButtonProps) => (
  <ErrorBoundary>
    <Button
      as={"href" in rest ? "a" : "button"}
      ref={setRef}
      title={caption}
      {...rest}
    >
      <Icon icon={icon} fill={fill} size="md" />
      <VisuallyHidden>{caption}</VisuallyHidden>
    </Button>
  </ErrorBoundary>
)
