import { Global, css, Theme } from "@emotion/react"

import { ThemeProp } from "../components"

const styles = (theme: Theme) => css`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100%;
    min-width: 100%;
    overflow: hidden;

    font: 500 1rem Quicksand, sans-serif;
    line-height: 1.5;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: currentColor;
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: ${theme.space.xs};
    margin: ${theme.space.xs} 0;
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.tokens.background.input};
    border-radius: ${theme.space.xs};
    :hover {
      background: ${theme.tokens.background.hover};
    }
    :active {
      background: ${theme.tokens.background.press};
    }
  }
  ::-webkit-scrollbar {
    width: ${theme.space.sm};
  }

  /* Keyboard focus debugging
  *:focus-visible {
    outline: 2px solid red !important;
  }
  */
`

export const GlobalStyles = ({ theme }: ThemeProp) => (
  <Global styles={styles(theme)} />
)
