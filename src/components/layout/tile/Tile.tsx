import { PropsWithChildren, useRef, useState } from "react"

import { ClassNameProp, Measurement, Position, SetState } from "../../base"
import { Resizable, ResizeItem, Movable, ErrorBoundary } from "../../utility"
import { getResizedRectangle } from "./utils/getResizedRectangle"
import { useAnchor, Orientation } from "./utils/useAnchor"

const MovableContainer = styled(Movable)`
  ${({ theme: { space } }) => css`
    padding: ${space.xs};
  `}
`

const Content = styled.div`
  ${({ theme: { space, border, tokens, shadow } }) => css`
    position: relative;
    border-radius: ${space.sm};
    outline: ${border} ${tokens.text.muted};
    background-color: ${tokens.background.surface};
    height: 100%;
    width: 100%;

    box-shadow: ${shadow.medium};

    :hover,
    :focus-within {
      outline: ${border} ${tokens.accent};
    }
  `}
`

export type TileRect = Pick<DOMRect, "height" | "width" | "x" | "y">

const defaultRect: TileRect = {
  height: 32 * 4,
  width: 32 * 4,
  x: 0,
  y: 0,
}

const defaultOrientation: Orientation = {
  vertical: "center",
  horizontal: "center",
}

export interface TileProps extends ClassNameProp {
  rect: TileRect
  onRectChange: SetState<TileRect>
  orientation: Orientation
  gridSize: number
  parentSize: Measurement
  minHeight?: number
  minWidth?: number
  editing?: boolean
}

export const Tile = ({
  gridSize,
  orientation = defaultOrientation,
  rect = defaultRect,
  onRectChange,
  parentSize,
  minHeight = gridSize * 4,
  minWidth = gridSize * 4,
  editing,
  children,
  className,
  ...delegated
}: PropsWithChildren<TileProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  const anchor = useAnchor(orientation, parentSize)
  const [transition, setTransition] = useState("0s")

  const handleResize = (resize: ResizeItem) =>
    onRectChange(rect =>
      getResizedRectangle({
        ref,
        rect,
        resize,
        anchor,
        minHeight,
        minWidth,
      })
    )

  const handleMove = ({ x, y }: Position) =>
    onRectChange(rect => ({ ...rect, x: rect.x + x, y: rect.y + y }))

  const size = {
    height: rect.height,
    width: rect.width,
  }

  const position = {
    [anchor.sideX]:
      anchor.sideX === "right" ? anchor.x - rect.x : anchor.x + rect.x,
    [anchor.sideY]:
      anchor.sideY === "bottom" ? anchor.y - rect.y : anchor.y + rect.y,
  }

  return (
    <ErrorBoundary>
      <MovableContainer
        {...delegated}
        snap={gridSize}
        onMove={handleMove}
        style={{ ...size, ...position, transition }}
        disabled={!editing}
        onMoveStart={() => setTransition("0.1s")}
        onMoveEnd={() => setTransition("0s")}
      >
        <Content ref={ref} className={className}>
          <Resizable
            snap={gridSize}
            onResize={handleResize}
            disabled={!editing}
            onResizeStart={() => setTransition("0.1s")}
            onResizeEnd={() => setTransition("0s")}
          />
          {children}
        </Content>
      </MovableContainer>
    </ErrorBoundary>
  )
}
