import { RefObject } from "react"

import { Anchor } from "./useAnchor"
import { exceedsWindow, Side } from "../../../base"
import { ResizeItem } from "../../../utility"
import { TileRect } from "../Tile"

const resizeExceedsWindow = (
  element: Element,
  { top, bottom, left, right }: ResizeItem
) => {
  const rect = element.getBoundingClientRect()
  const newRect: Record<Side, number> = {
    top: rect.top - top,
    left: rect.left - left,
    bottom: rect.bottom + bottom,
    right: rect.right + right,
  }
  return exceedsWindow(newRect)
}

interface Args {
  resize: ResizeItem
  rect: TileRect
  ref: RefObject<Element>
  anchor: Anchor
  minHeight: number
  minWidth: number
}

export const getResizedRectangle = ({
  ref,
  resize,
  rect,
  anchor,
  minHeight,
  minWidth,
}: Args) => {
  const { top, bottom, left, right } = resize

  const movable = ref.current
  if (!movable || resizeExceedsWindow(movable, resize)) return rect

  const x = anchor.sideX === "right" ? rect.x + right : rect.x - left
  const y = anchor.sideY === "bottom" ? rect.y + bottom : rect.y - top

  const height = rect.height + top + bottom
  const width = rect.width + left + right

  return {
    x: width >= minWidth ? x : rect.x,
    width: width >= minWidth ? width : rect.width,

    y: height >= minHeight ? y : rect.y,
    height: height >= minHeight ? height : rect.height,
  }
}
