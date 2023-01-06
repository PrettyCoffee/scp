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

const getAnchorPosition = (orientation: Orientation): Anchor => {
  const { innerHeight, innerWidth } = window
  return {
    x: orientation.horizontal === "center" ? innerWidth / 2 : 0,
    y: orientation.vertical === "center" ? innerHeight / 2 : 0,
    sideX: orientation.horizontal === "right" ? "right" : "left",
    sideY: orientation.vertical === "bottom" ? "bottom" : "top",
  }
}

export const useAnchor = (anchors: Orientation) => {
  const [position, setPosition] = useState(getAnchorPosition(anchors))
  useEventListener({
    type: "resize",
    listener: () => setPosition(getAnchorPosition(anchors)),
  })
  return position
}
