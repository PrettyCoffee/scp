import { createAtom } from "../utils/createAtom"

const createDefaultStyles = (styles: string) =>
  `/* * * * * * * * * *
 * Example Styles  * <- remove this block
 * * * * * * * * * *    to apply styles
${styles}`

const defaultGlobalCss = createDefaultStyles(`
:root {
  --tokens-accent: coral;
}

/** Note:
 *  Don't try to target the
 *  css-xxxxxxx class names!
 *  They are unstable and 
 *  can change over time. 
 **/
`)

const defaultHeaderCss = createDefaultStyles(`
border-top: none;

&[data-align="start"] {
  border-radius: 0 0 var(--space-md) 0;
  border-left: none;
}

&[data-align="center"] {
  border-radius: 0 0 var(--space-md) var(--space-md);
  transform: translateY(calc(-1 * var(--space-sm)));
}

&[data-align="end"] {
  border-radius: 0 0 0 var(--space-md);
  border-right: none;
}
`)

const defaultTileCss = createDefaultStyles(`
outline-color: transparent;
background-color: var(--tokens-background-surface);
opacity: 0.7;
:hover {
  opacity: 1;
}
`)

export interface GlobalCustomCss {
  tile: string
  header: string
  global: string
}

const initialCustomCss: GlobalCustomCss = {
  global: defaultGlobalCss,
  header: defaultHeaderCss,
  tile: defaultTileCss,
}

export const [customCssAtom, useCustomCss] = createAtom(
  "global",
  "customCss",
  initialCustomCss
)
