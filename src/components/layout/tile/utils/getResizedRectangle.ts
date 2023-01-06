import { RefObject } from "react"

import { exceedsWindow, Position, Side, Size } from "../../../base"
import { ResizeItem } from "../../../utility"
import { Anchor } from "./useAnchor"

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
  size: Size
  pos: Position
  ref: RefObject<Element>
  anchor: Anchor
  minHeight: number
  minWidth: number
}

export const getResizedRectangle = ({
  ref,
  resize,
  pos,
  size,
  anchor,
  minHeight,
  minWidth,
}: Args) => {
  const { top, bottom, left, right } = resize

  const movable = ref.current
  if (!movable || resizeExceedsWindow(movable, resize))
    return {
      ...size,
      ...pos,
    }

  const x = anchor.sideX === "right" ? pos.x + right : pos.x - left
  const y = anchor.sideY === "bottom" ? pos.y + bottom : pos.y - top

  const height = size.height + top + bottom
  const width = size.width + left + right

  return {
    x: width >= minWidth ? x : pos.x,
    width: width >= minWidth ? width : size.width,

    y: height >= minHeight ? y : pos.y,
    height: height >= minHeight ? height : size.height,
  }
}
