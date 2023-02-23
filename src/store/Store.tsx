import { PropsWithChildren } from "react"

import { StoragePrefixProvider } from "@startpage/local-storage"

import { getDefaultWidgets } from "~/store/jotai-store/widgets/utils/getDefaultWidgets"

import { useSpacing, GlobalSpacing } from "./jotai-store"
import { PreloadAtoms } from "./jotai-store/PreloadAtoms"
import { WidgetStoreProvider } from "./WidgetStore"

const ConsumeSpacing = ({
  children,
}: {
  children: (state: GlobalSpacing) => JSX.Element
}) => {
  const spacing = useSpacing()
  return children(spacing.value)
}

export const Store = ({ children }: PropsWithChildren) => (
  <StoragePrefixProvider prefix="todo-">
    <PreloadAtoms />
    <ConsumeSpacing>
      {spacing => (
        <WidgetStoreProvider initial={getDefaultWidgets(spacing.gridSize)}>
          {children}
        </WidgetStoreProvider>
      )}
    </ConsumeSpacing>
  </StoragePrefixProvider>
)
