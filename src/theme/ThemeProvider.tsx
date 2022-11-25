import { PropsWithChildren } from "react"

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react"

import { color, tokens } from "./color"
import { GlobalStyles } from "./GlobalStyles"
import { spacing } from "./spacing"

const border = (color: string) => `${spacing.rem.xxs} solid ${color}`

export const theme = {
  space: { ...spacing.rem },
  color,
  tokens,
  border: {
    neutral: border(tokens.text.default),
    primary: border(color.primary),
    secondary: border(color.secondary),
  },
}

export type Theme = typeof theme

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <EmotionThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </EmotionThemeProvider>
)
