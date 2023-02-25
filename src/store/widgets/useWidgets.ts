import { atom, useAtomValue, useSetAtom } from "jotai"

import { nextIdAtom } from "./utils/nextIdAtom"
import { WidgetUserConfig, widgetsAtom } from "./widgetsAtom"

const addWidgetAtom = atom(
  null,
  (get, set, widget: Omit<WidgetUserConfig, "id">) =>
    set(widgetsAtom, [...get(widgetsAtom), { ...widget, id: get(nextIdAtom) }])
)

const updateWidgetAtom = atom(
  null,
  (get, set, id: string, config: Partial<Omit<WidgetUserConfig, "id">>) =>
    set(
      widgetsAtom,
      get(widgetsAtom).map(widget =>
        widget.id === id ? { ...widget, ...config } : widget
      )
    )
)

const removeWidgetAtom = atom(null, (get, set, id: string) =>
  set(
    widgetsAtom,
    get(widgetsAtom).filter(widget => widget.id !== id)
  )
)

export const useWidgets = () => {
  const value = useAtomValue(widgetsAtom)
  const update = useSetAtom(updateWidgetAtom)
  const add = useSetAtom(addWidgetAtom)
  const remove = useSetAtom(removeWidgetAtom)

  return {
    value,
    update,
    add,
    remove,
  }
}
