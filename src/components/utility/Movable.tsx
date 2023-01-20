import { PropsWithChildren, useEffect, useRef, useState } from "react"

import { DisabledProp, DivProps, Position } from "../base/baseProps"
import { exceedsWindow } from "../base/exceedsWindow"
import { DragMoveArgs, useDragging } from "../hooks"

interface PositioningProps {
  change: Position
  isDragging: boolean
}
const Layout = styled.div`
  position: absolute;
  width: max-content;
  height: max-content;
`
const Positioning = styled(Layout)<PositioningProps>`
  ${({ change, isDragging }) => css`
    position: absolute;
    transform: translate(${change.x}px, ${change.y}px);
    width: max-content;
    height: max-content;
    cursor: ${isDragging ? "grabbing" : "grab"};
  `}
`

const initialPosition: Position = {
  x: 0,
  y: 0,
}

interface MovableProps
  extends Pick<DivProps, "className" | "style">,
    DisabledProp {
  snap?: number
  onMove?: (change: Position) => void
  onMoveStart?: () => void
  onMoveEnd?: () => void
}

const EnabledMovable = ({
  children,
  onMove,
  snap = 0,
  onMoveStart,
  onMoveEnd,
  ...delegated
}: PropsWithChildren<MovableProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  const start = useRef(initialPosition)

  const [translate, setTranslate] = useState<Position>(initialPosition)
  const move = ({ delta }: DragMoveArgs) => {
    const { width = 0, height = 0 } = ref.current?.getBoundingClientRect() ?? {}

    const left = start.current.x + delta.x
    const right = left + width
    const top = start.current.y + delta.y
    const bottom = top + height

    const deltaX = exceedsWindow({ left, right }) ? translate.x : delta.x
    const deltaY = exceedsWindow({ top, bottom }) ? translate.y : delta.y

    setTranslate({
      x: deltaX,
      y: deltaY,
    })
  }
  const { isDragging } = useDragging({
    ref,
    snap,
    cursor: "grabbing",
    onDrag: move,
    onDragStart: onMoveStart,
    onDragEnd: onMoveEnd,
  })

  useEffect(() => {
    if (isDragging) {
      const { x, y } = ref.current?.getBoundingClientRect() ?? initialPosition
      start.current = { x, y }
    } else {
      start.current = initialPosition
    }
  }, [isDragging])

  useEffect(() => {
    const { x, y } = translate
    if (!isDragging && (x != 0 || y != 0)) {
      onMove?.(translate)
      setTranslate(initialPosition)
    }
  }, [isDragging, onMove, translate])

  return (
    <Positioning
      ref={ref}
      isDragging={isDragging}
      change={translate}
      {...delegated}
    >
      {children}
    </Positioning>
  )
}

export const Movable = ({
  disabled,
  onMove,
  onMoveEnd,
  onMoveStart,
  snap,
  ...delegated
}: PropsWithChildren<MovableProps>) =>
  disabled ? (
    <Layout {...delegated} />
  ) : (
    <EnabledMovable
      onMove={onMove}
      onMoveStart={onMoveStart}
      onMoveEnd={onMoveEnd}
      snap={snap}
      {...delegated}
    />
  )
