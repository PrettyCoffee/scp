import { PropsWithChildren } from "react"

import { StoragePrefixProvider } from "@startpage/local-storage"

import { getDefaultTiles } from "~/page/getDefaultTiles"

import { GeneralStore, GeneralStoreConsumer } from "./General"
import { WidgetStoreProvider } from "./WidgetStore"

export const Store = ({ children }: PropsWithChildren) => (
  <StoragePrefixProvider prefix="todo-">
    <GeneralStore>
      <GeneralStoreConsumer>
        {([{ gridSize }]) => (
          <WidgetStoreProvider initial={getDefaultTiles(gridSize)}>
            {children}
          </WidgetStoreProvider>
        )}
      </GeneralStoreConsumer>
    </GeneralStore>
  </StoragePrefixProvider>
)
