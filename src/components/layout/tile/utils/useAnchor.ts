import { useMemo } from "react"

import { Measurement } from "../../../base"

export interface Orientation {
  vertical: "top" | "center" | "bottom"
  horizontal: "left" | "center" | "right"
}

export interface Anchor {
  x: number
  y: number
  sideX: "right" | "left"
  sideY: "top" | "bottom"
}

const getAnchorPosition = (
  orientation: Orientation,
  parentSize: Measurement
): Anchor => {
  const xCenter = parentSize.width / 2
  const yCenter = parentSize.height / 2

  return {
    x: orientation.horizontal === "center" ? xCenter : 0,
    y: orientation.vertical === "center" ? yCenter : 0,
    sideX: orientation.horizontal === "right" ? "right" : "left",
    sideY: orientation.vertical === "bottom" ? "bottom" : "top",
  }
}

export const useAnchor = (anchors: Orientation, parentSize: Measurement) =>
  useMemo(() => getAnchorPosition(anchors, parentSize), [anchors, parentSize])
