import { Side } from "../../../base"

export const isHorizontal = (side: Side) => side === "left" || side === "right"

export const isNorthWest = (side: [Side, Side]) =>
  (side.includes("top") && side.includes("right")) ||
  (side.includes("bottom") && side.includes("left"))

export const getCursorBySide = (side: Side | [Side, Side]) => {
  if (Array.isArray(side))
    return isNorthWest(side) ? "nesw-resize" : "nwse-resize"

  return isHorizontal(side) ? "ew-resize" : "ns-resize"
}
