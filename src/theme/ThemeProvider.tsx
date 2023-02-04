import { PropsWithChildren } from "react"

import { Global, ThemeProvider as EmotionThemeProvider } from "@emotion/react"

import { useGeneralStore } from "../store"
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

const joinedTheme = { ...cssTheme, raw: theme }

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { globalCss } = useGeneralStore()
  return (
    <EmotionThemeProvider theme={joinedTheme}>
      <Global styles={`:root{${css}}`} />
      <GlobalStyles theme={joinedTheme} />
      <Global styles={globalCss} />
      {children}
    </EmotionThemeProvider>
  )
}
