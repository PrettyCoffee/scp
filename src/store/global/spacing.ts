import { spacing } from "~/theme"

import { createAtom } from "../createAtom"

export interface GlobalSpacing {
  headerGap: number
  widgetGap: number
  windowPadding: number
  headerPadding: number
  gridSize: number
}

const initialSpacing: GlobalSpacing = {
  headerGap: spacing.px.sm,
  widgetGap: spacing.px.xs,
  windowPadding: spacing.px.sm,
  headerPadding: spacing.px.sm,
  gridSize: spacing.px.lg,
}

export const [spacingAtom, useSpacing] = createAtom(
  "global",
  "spacing",
  initialSpacing
)
