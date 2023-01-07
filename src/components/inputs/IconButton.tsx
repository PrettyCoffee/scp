import { Icon, IconDefinition, VisuallyHidden } from "../primitives"

const Button = styled.button(
  ({ theme: { border, space } }) => css`
    position: relative;

    --button-size: ${space.lg};
    height: var(--button-size);
    width: var(--button-size);
    min-height: var(--button-size);
    min-width: var(--button-size);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    color: #cdd6f4;
    border-radius: 50%;
    overflow: hidden;
    isolation: isolate;
    background-color: transparent;
    text-decoration: none;
    border: none;
    cursor: pointer;

    &:focus-visible {
      outline: ${border.primary};
    }

    &::before {
      content: "";
      position: absolute;
      inset: ${space.xs};
      border-radius: 50%;
      z-index: -1;

      background-color: #313244;
      transition: 0.2s solid;
      transition-property: inset, background-color;
    }
    &:hover::before,
    &:focus-visible::before {
      inset: 0;
      background-color: #45475a;
    }
    &:active::before {
      inset: 0;
      background-color: #585b70;
    }
  `
)

interface IconButtonProps {
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
