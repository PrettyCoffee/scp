import { PropsWithChildren } from "react"

import { Global, ThemeProvider as EmotionThemeProvider } from "@emotion/react"

import { color, tokens } from "./color"
import { createCssVariables } from "./createCssVariables"
import { GlobalStyles } from "./GlobalStyles"
import { shadow } from "./shadow"
import { spacing } from "./spacing"

export const theme = {
  space: { ...spacing.rem },
  color,
  tokens,
  shadow,
  border: `${spacing.rem["3xs"]} solid`,
}

export const { css, theme: cssTheme } = createCssVariables(theme)

export type Theme = typeof theme

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <EmotionThemeProvider theme={cssTheme}>
    <Global styles={`:root{${css}}`} />
    <GlobalStyles />
    {children}
  </EmotionThemeProvider>
)
