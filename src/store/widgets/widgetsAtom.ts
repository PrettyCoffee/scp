import { Orientation, TileRect } from "~/components"

import { getDefaultWidgets } from "./utils/getDefaultWidgets"
import { createAtom } from "../utils/createAtom"

export interface WidgetUserConfig {
  id: string
  rect: TileRect
  orientation: Orientation
  customCss?: string
  minHeight?: number
  minWidth?: number
}

export const [widgetsAtom] = createAtom<WidgetUserConfig[]>(
  "workspace",
  "widgets",
  getDefaultWidgets(32)
)
