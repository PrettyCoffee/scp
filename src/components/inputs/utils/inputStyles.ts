import { ThemeProp } from "../../base"
import { fontStyles } from "../../primitives"
import { inputBorder } from "./inputBorder"

export interface InputStyleProps {
  valid: boolean
  contentType?: "code" | "text"
}

export const inputStyles = ({
  theme,
  theme: { tokens, space },
  valid,
  contentType = "text",
}: ThemeProp & InputStyleProps) => css`
  ${fontStyles({
    theme,
    style: contentType === "code" ? "monospace" : "sans-serif",
  })}

  ${inputBorder({ theme, color: !valid ? "danger" : "default" })}

  display: inline-block;
  padding: ${space.sm};
  width: 100%;

  background-color: ${tokens.background.alt};

  ::placeholder {
    color: ${tokens.text.muted};
  }
`
