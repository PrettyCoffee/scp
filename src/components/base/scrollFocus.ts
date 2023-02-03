import { ThemeProp } from "./baseProps"

export const scrollFocus = ({
  theme: { tokens, border, space },
}: ThemeProp) => css`
  :focus-visible {
    outline: ${border} ${tokens.accent};
    outline-offset: calc(-1 * ${space.xxs});
    outline-width: ${space.xxs};
  }
`
