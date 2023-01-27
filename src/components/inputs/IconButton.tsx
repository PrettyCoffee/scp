import { RefProp } from "../base"
import { Icon, IconDefinition, VisuallyHidden } from "../primitives"
import { ErrorBoundary } from "../utility"
import { ButtonStyleProps, buttonStyles } from "./utils/buttonStyles"

const Button = styled.button<ButtonStyleProps>`
  ${buttonStyles}
  text-decoration: none;
`

interface IconButtonProps extends RefProp, ButtonStyleProps {
  icon: IconDefinition
  caption: string
  onClick?: () => void
  href?: string
}

export const IconButton = ({
  caption,
  icon,
  setRef,
  ...rest
}: IconButtonProps) => (
  <ErrorBoundary>
    <Button
      as={"href" in rest ? "a" : "button"}
      ref={setRef}
      title={caption}
      {...rest}
    >
      <Icon icon={icon} size="md" />
      <VisuallyHidden>{caption}</VisuallyHidden>
    </Button>
  </ErrorBoundary>
)
