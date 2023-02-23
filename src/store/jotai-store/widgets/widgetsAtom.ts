import { Orientation, TileRect } from "~/components"

import { createAtom } from "../createAtom"
import { getDefaultWidgets } from "./utils/getDefaultWidgets"

export interface WidgetConfig {
  id: string
  rect: TileRect
  orientation: Orientation
  customCss?: string
  minHeight?: number
  minWidth?: number
}

export const [widgetsAtom] = createAtom<WidgetConfig[]>(
  "workspace",
  "widgets",
  getDefaultWidgets(16)
)
