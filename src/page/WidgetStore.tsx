import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react"

import { TileRect, Orientation } from "../components"

export interface WidgetConfig {
  id: string
  rect: TileRect
  orientation: Orientation
  css?: string
  minHeight?: number
  minWidth?: number
}

interface WidgetStoreState {
  widgets: WidgetConfig[]
  addWidget: (config: Omit<WidgetConfig, "id">) => void
  updateWidget: (config: WidgetConfig) => void
  removeWidget: (id: string) => void
}

const Context = createContext<WidgetStoreState>({
  widgets: [],
  addWidget: () => null,
  updateWidget: () => null,
  removeWidget: () => null,
})

const nextId = (widgets: WidgetConfig[]) => {
  let i = 0
  for (; widgets.some(({ id }) => id === String(i)); i++);
  return String(i)
}

export const WidgetStoreProvider = ({
  initial = [],
  children,
}: PropsWithChildren<{ initial?: WidgetConfig[] }>) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(initial)

  const addWidget: WidgetStoreState["addWidget"] = useCallback(
    config =>
      setWidgets(widgets => [...widgets, { id: nextId(widgets), ...config }]),
    []
  )

  const updateWidget: WidgetStoreState["updateWidget"] = useCallback(
    config =>
      setWidgets(widgets =>
        widgets.map(widget => (widget.id === config.id ? config : widget))
      ),
    []
  )

  const removeWidget: WidgetStoreState["removeWidget"] = useCallback(
    id => setWidgets(widgets => widgets.filter(widget => widget.id !== id)),
    []
  )

  return (
    <Context.Provider
      value={{
        widgets,
        addWidget,
        updateWidget,
        removeWidget,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useWidgetStore = () => useContext(Context)
