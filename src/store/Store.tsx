import { PropsWithChildren } from "react"

import { StoragePrefixProvider } from "@startpage/local-storage"

import { defaultTiles } from "../page/defaultTiles"
import { GeneralStore } from "./General"
import { WidgetStoreProvider } from "./WidgetStore"

export const Store = ({ children }: PropsWithChildren) => (
  <StoragePrefixProvider prefix="todo-">
    <GeneralStore>
      <WidgetStoreProvider initial={defaultTiles}>
        {children}
      </WidgetStoreProvider>
    </GeneralStore>
  </StoragePrefixProvider>
)
