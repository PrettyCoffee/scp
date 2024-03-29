import { RefObject } from "react"

import { getCursorBySide } from "./getCursorBySide"
import { Position, Side } from "../../../base"
import { useDragging, DragMoveArgs } from "../../../hooks"
import { ResizableProps } from "../Resizable"

const getDeltaBySide = (delta: Position, side: Side) => {
  if (side === "bottom") return delta.y
  if (side === "right") return delta.x
  if (side === "top") return delta.y * -1
  return delta.x * -1
}

const noResize = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
}

export type ResizeItem = Record<Side, number>

export interface ResizeArgs extends Omit<ResizableProps, "disabled"> {
  ref: RefObject<HTMLElement>
  side: Side | [Side, Side]
}

export const useResize = ({
  ref,
  side,
  snap,
  onResize,
  onResizeStart,
  onResizeEnd,
}: ResizeArgs) => {
  const sides = Array.isArray(side) ? side : [side]

  const move = ({ deltaSinceLast }: DragMoveArgs) => {
    const resize = sides.reduce(
      (result, side) => ({
        ...result,
        [side]: getDeltaBySide(deltaSinceLast, side),
      }),
      noResize
    )
    onResize?.(resize)
  }

  const { isDragging } = useDragging({
    ref,
    snap,
    cursor: getCursorBySide(side),
    onDrag: move,
    onDragStart: onResizeStart,
    onDragEnd: onResizeEnd,
  })

  return { isResizing: isDragging }
}
