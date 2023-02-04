import { useCallback } from "react"

import { createStorageContext } from "@startpage/local-storage"

import { useLatest } from "../components"
import { cssTheme, spacing } from "../theme"

const createDefaultStyles = (styles: string) =>
  `/* * * * * * * * * *
 * Example Styles  * <- remove this block
 * * * * * * * * * *
${styles}

`

const defaultHeaderCss = createDefaultStyles(`
border-top: none;

&[data-align="start"] {
  border-radius: 0 0 var(--space-md) 0;
  border-left: none;
}

&[data-align="center"] {
  border-radius: 0 0 var(--space-md) var(--space-md);
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

const defaultBg: Background<"solid"> = {
  type: "solid",
  base: cssTheme.tokens.background.base,
}

type BgVariant<Type extends string, T> = T & {
  type: Type
}

export type PatternBackground = BgVariant<
  "pattern",
  {
    base: string
    opacity: number
    path: string
    pathColor: string
    width: number
    height: number
    scale: number
  }
>

type SolidBackground = BgVariant<"solid", { base: string }>
type ImageBackground = BgVariant<
  "image",
  { base: string; opacity: number; src: string; filter: string }
>
type CustomBackground = BgVariant<"custom", { base: string; css: string }>

export interface BackgroundLookup {
  solid: SolidBackground
  image: ImageBackground
  pattern: PatternBackground
  custom: CustomBackground
}

export type Background<
  T extends keyof BackgroundLookup = keyof BackgroundLookup
> = BackgroundLookup[T]

interface GeneralStoreState {
  headerGap: number
  windowPadding: number
  gridSize: number
  background: Background
  globalTileCss: string
  headerCss: string
}

const defaultState: GeneralStoreState = {
  headerGap: spacing.px.sm,
  windowPadding: spacing.px.sm,
  gridSize: spacing.px.lg,
  background: defaultBg,
  globalTileCss: defaultTileCss,
  headerCss: defaultHeaderCss,
}

export const {
  StorageProvider: GeneralStore,
  useStorage,
  StorageConsumer: GeneralStoreConsumer,
} = createStorageContext<GeneralStoreState>("general", defaultState)

export const useGeneralStore = () => {
  const [store, setStore] = useStorage()
  const latest = useLatest(store)
  const setter = useLatest(setStore)

  const setStoreKey = useCallback(
    <Key extends keyof GeneralStoreState>(
      key: Key,
      value: GeneralStoreState[Key]
    ) =>
      setter.current({
        ...latest.current,
        [key]: value,
      }),
    [latest, setter]
  )

  const resetStore = useCallback(() => setStore(defaultState), [setStore])

  return {
    ...store,
    setStoreKey,
    resetStore,
  }
}
