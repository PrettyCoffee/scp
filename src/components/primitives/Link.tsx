import { ErrorBoundary } from "../utility"
import { FontProps, fontStyles } from "./Text"

type LinkTextProps = Pick<FontProps, "size">

const LinkText = styled.a<LinkTextProps>(
  ({ theme, theme: { border, tokens, space }, size }) => css`
    ${fontStyles({ theme, size, color: "active" })}

    text-decoration: none;
    :hover,
    :focus-visible {
      text-decoration: underline;
    }
    :focus-visible {
      outline: ${border} ${tokens.accent};
      outline-offset: ${space.xxs};
      border-radius: ${space.xxs};
    }
  `
)

export interface LinkProps extends LinkTextProps {
  href: string
  target?: "_self" | "_blank"
  children: string
}

export const Link = ({ children, ...delegated }: LinkProps) => (
  <ErrorBoundary>
    <LinkText {...delegated}>{children}</LinkText>
  </ErrorBoundary>
)
