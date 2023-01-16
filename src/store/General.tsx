import { createStorageContext } from "@startpage/local-storage"

import { spacing } from "../theme/spacing"

export const {
  StorageProvider: GeneralStore,
  useStorage: useGeneralStore,
  StorageConsumer: GeneralStoreConsumer,
} = createStorageContext("general", {
  windowPadding: spacing.px.sm,
  gridSize: spacing.px.lg,
})
