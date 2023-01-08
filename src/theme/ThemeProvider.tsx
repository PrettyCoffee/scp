import { PropsWithChildren } from "react"

import { Global, ThemeProvider as EmotionThemeProvider } from "@emotion/react"

import { color, tokens } from "./color"
import { createCssVariables } from "./createCssVariables"
import { GlobalStyles } from "./GlobalStyles"
import { spacing } from "./spacing"

export const theme = {
  space: { ...spacing.rem },
  color,
  tokens,
  border: `${spacing.rem["3xs"]} solid`,
}

const { css, theme: cssTheme } = createCssVariables(theme)

export type Theme = typeof theme

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <EmotionThemeProvider theme={cssTheme}>
    <Global styles={`:root{${css}}`} />
    <GlobalStyles />
    {children}
  </EmotionThemeProvider>
)
