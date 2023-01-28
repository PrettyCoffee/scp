import { ThemeProp } from "../../base"
import { fontStyles } from "../../primitives"

export interface InputStyleProps {
  valid: boolean
}

export const inputStyles = ({
  theme,
  theme: { tokens, space, border, color },
  valid,
}: ThemeProp & InputStyleProps) => css`
  ${fontStyles({ theme })}

  display: inline-block;
  padding: ${space.sm};
  width: 100%;

  border: ${border} ${tokens.text.default};
  border-radius: ${space.sm};
  background-color: ${tokens.background.alt};

  ::placeholder {
    color: ${tokens.text.muted};
  }

  :focus-visible {
    border-color: ${tokens.accent};
  }

  ${!valid &&
  css`
    &,
    :focus-visible {
      border-color: ${color.red};
    }
  `}
`
