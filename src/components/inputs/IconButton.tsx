import { Icon, IconDefinition, VisuallyHidden } from "../primitives"
import { ButtonStyleProps, buttonStyles } from "./utils/buttonStyles"

const Button = styled.button<ButtonStyleProps>`
  ${buttonStyles}
  text-decoration: none;
`

interface IconButtonProps extends ButtonStyleProps {
  icon: IconDefinition
  caption: string
  onClick: () => void
}

interface IconLinkProps extends Omit<IconButtonProps, "onClick"> {
  href: string
}

const Content = ({
  caption,
  icon,
}: Pick<IconButtonProps, "caption" | "icon">) => (
  <>
    <Icon icon={icon} size="md" />
    <VisuallyHidden>{caption}</VisuallyHidden>
  </>
)

export const IconButton = ({
  caption,
  icon,
  ...rest
}: IconButtonProps | IconLinkProps) => {
  const commonProps = {
    title: caption,
  }

  const content = <Content caption={caption} icon={icon} />

  return (
    <>
      {"onClick" in rest ? (
        <Button {...commonProps} {...rest}>
          {content}
        </Button>
      ) : (
        <Button as="a" {...commonProps} {...rest}>
          {content}
        </Button>
      )}
    </>
  )
}
