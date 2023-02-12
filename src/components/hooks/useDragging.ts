import { RefObject, useEffect, useRef, useState } from "react"

import { globalCursor, Position } from "../base"
import { useEventListener } from "./useEventListener"
import { useLatest } from "./useLatest"
import { useThrottle } from "./useThrottle"

const applySnap = (value: number, snap = 1) => {
  if (!snap || snap < 0) return value
  const rest = value % snap
  const small = value - rest

  if (value > 0) {
    const big = small + snap
    return rest / snap < 0.5 ? small : big
  } else {
    const big = small - snap
    return rest / snap > -0.5 ? small : big
  }
}

const getSnappedDelta = (
  oldPos: Position,
  newPos: Position,
  snap?: number
) => ({
  x: applySnap(newPos.x - oldPos.x, snap),
  y: applySnap(newPos.y - oldPos.y, snap),
})

const applyCursor = (cursor: string) => {
  const body = document.body
  body.style.setProperty("cursor", cursor)
}

const resetCursor = () => {
  const body = document.body
  body.style.removeProperty("cursor")
}

interface DragEvents {
  onDragStart?: () => void
  onDragEnd?: () => void
}
interface DragEventsProps extends DragEvents {
  isDragging: boolean
}
const useDragEvents = ({
  isDragging,
  onDragEnd,
  onDragStart,
}: DragEventsProps) => {
  const didMoveOnce = useRef(false)
  const callbacks = useLatest({
    onDragStart,
    onDragEnd,
  })
  useEffect(() => {
    if (!isDragging && !didMoveOnce.current) return

    if (isDragging) {
      didMoveOnce.current = true
      callbacks.current.onDragStart?.()
    } else callbacks.current.onDragEnd?.()
  }, [callbacks, isDragging])
}

export interface DragMoveArgs {
  /** Native mouse event */
  event: MouseEvent
  /** Position where dragging was started */
  start: Position
  /** Current position of the mouse */
  current: Position
  /** Change of position in relation to start */
  delta: Position
  /** Change of position in relation to position of the last executed callback */
  deltaSinceLast: Position
}

export interface DraggingArgs {
  ref: RefObject<HTMLElement>
  snap?: number
  onDragStart?: () => void
  onDragEnd?: () => void
  onDrag?: (args: DragMoveArgs) => void
  cursor?: string
}

export const useDragging = ({
  ref,
  snap,
  onDragStart,
  onDragEnd,
  onDrag: onMove,
  cursor,
}: DraggingArgs) => {
  const [isDragging, setIsDragging] = useState(false)
  const startPosition = useRef<Position | null>(null)
  const lastPosition = useRef<Position | null>(null)

  const move = useThrottle((event: MouseEvent) => {
    const start = startPosition.current
    event.stopPropagation()
    event.preventDefault()
    if (!start) return

    const last = lastPosition.current ?? start
    const current = { x: event.clientX, y: event.clientY }

    const delta = getSnappedDelta(start, current, snap)
    const deltaSinceLast = getSnappedDelta(last, current, snap)

    if (deltaSinceLast.x === 0 && deltaSinceLast.y === 0) return
    lastPosition.current = {
      x: last.x + deltaSinceLast.x,
      y: last.y + deltaSinceLast.y,
    }
    onMove?.({
      event,
      start,
      current,
      delta,
      deltaSinceLast,
    })
  }, 50)

  useEventListener({
    ref,
    type: "mousedown",
    listener: e => {
      e.stopPropagation()
      e.preventDefault()
      setIsDragging(true)
      startPosition.current = { x: e.clientX, y: e.clientY }
      if (cursor) globalCursor.apply(cursor)
    },
  })

  useEventListener({
    type: "mousemove",
    disabled: !isDragging,
    listener: move,
  })

  useEventListener({
    type: "mouseup",
    disabled: !isDragging,
    listener: () => {
      setIsDragging(false)
      startPosition.current = null
      lastPosition.current = null
      globalCursor.reset()
    },
  })

  useDragEvents({
    isDragging,
    onDragEnd,
    onDragStart,
  })

  return { isDragging }
}
