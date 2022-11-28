import { RefObject } from "react"

import { Position, Side, SideProp } from "../../base/baseProps"
import { useDragging, DragMoveArgs } from "../../hooks"
import { ResizableProps } from "./Resizable"
import { getHandleBySide } from "./ResizeHandle"

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

export interface ResizeArgs
  extends SideProp,
    Pick<ResizableProps, "onResize" | "snap"> {
  ref: RefObject<HTMLElement>
}

export const useResize = ({ ref, side, snap, onResize }: ResizeArgs) => {
  const move = ({ deltaSinceLast }: DragMoveArgs) => {
    onResize?.({
      ...noResize,
      [side]: getDeltaBySide(deltaSinceLast, side),
    })
  }

  const { isDragging } = useDragging({
    ref,
    snap,
    cursor: getHandleBySide(side),
    onMove: move,
  })

  return { isResizing: isDragging }
}
