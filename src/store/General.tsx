import { createStorageContext } from "@startpage/local-storage"

import { spacing } from "../theme"
import { solidBg } from "./exampleBackground"

type BgVariant<Type extends string, T> = T & {
  type: Type
}

export type Background =
  | BgVariant<"solid", { base: string }>
  | BgVariant<
      "image",
      { base: string; opacity: number; src: string; filter: string }
    >

interface GeneralStoreState {
  windowPadding: number
  gridSize: number
  background: Background
}

export const {
  StorageProvider: GeneralStore,
  useStorage: useGeneralStore,
  StorageConsumer: GeneralStoreConsumer,
} = createStorageContext<GeneralStoreState>("general", {
  windowPadding: spacing.px.sm,
  gridSize: spacing.px.lg,
  background: solidBg,
})
