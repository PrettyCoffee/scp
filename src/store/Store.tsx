import { PropsWithChildren } from "react"

import { StoragePrefixProvider } from "@startpage/local-storage"

import { getDefaultTiles } from "~/page/getDefaultTiles"

import { GeneralStore, GeneralStoreConsumer } from "./General"
import { PreloadAtoms } from "./jotai-store/PreloadAtoms"
import { WidgetStoreProvider } from "./WidgetStore"

export const Store = ({ children }: PropsWithChildren) => (
  <StoragePrefixProvider prefix="todo-">
    <PreloadAtoms />
    <GeneralStore>
      <GeneralStoreConsumer>
        {([{ spacing }]) => (
          <WidgetStoreProvider initial={getDefaultTiles(spacing.gridSize)}>
            {children}
          </WidgetStoreProvider>
        )}
      </GeneralStoreConsumer>
    </GeneralStore>
  </StoragePrefixProvider>
)
