import { useState } from "react"

import { useEventListener } from "../../../hooks"

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

const getCenter = (size: number, windowPadding: number) =>
  (size - 2 * windowPadding) / 2

const getAnchorPosition = (
  orientation: Orientation,
  windowPadding: number
): Anchor => {
  const { innerHeight, innerWidth } = window

  const xCenter = getCenter(innerWidth, windowPadding)
  const yCenter = getCenter(innerHeight, windowPadding)

  return {
    x: orientation.horizontal === "center" ? xCenter : 0,
    y: orientation.vertical === "center" ? yCenter : 0,
    sideX: orientation.horizontal === "right" ? "right" : "left",
    sideY: orientation.vertical === "bottom" ? "bottom" : "top",
  }
}

export const useAnchor = (anchors: Orientation, windowPadding: number) => {
  const [position, setPosition] = useState(
    getAnchorPosition(anchors, windowPadding)
  )
  useEventListener({
    type: "resize",
    listener: () => setPosition(getAnchorPosition(anchors, windowPadding)),
  })
  return position
}
