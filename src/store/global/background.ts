import { createAtom } from "../utils/createAtom"

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

const defaultBackground: Background<"solid"> = {
  type: "solid",
  base: "var(--tokens-background-base)",
}

export const [backgroundAtom, useBackground] = createAtom<Background>(
  "global",
  "background",
  defaultBackground
)
