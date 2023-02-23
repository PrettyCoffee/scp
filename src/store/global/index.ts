import { atom } from "jotai"

import { backgroundAtom } from "./background"
import { customCssAtom } from "./customCss"
import { spacingAtom } from "./spacing"

export const globalAtom = atom(get => ({
  background: get(backgroundAtom),
  spacing: get(spacingAtom),
  customCss: get(customCssAtom),
}))
globalAtom.debugLabel = "global"

export * from "./background"
export * from "./customCss"
export * from "./spacing"
