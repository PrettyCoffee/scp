import { PropsWithChildren, useRef } from "react"

import { gridSize } from "../../../config"
import { Position, SetState } from "../../base"
import { Resizable, ResizeItem, Movable } from "../../utility"
import { getResizedRectangle } from "./utils/getResizedRectangle"
import { useAnchor, Orientation } from "./utils/useAnchor"

const MovableContainer = styled(Movable)`
  ${({ theme: { space } }) => css`
    transition: 0.1s;
    padding: ${space.xs};
  `}
`

const Content = styled.div`
  ${({ theme: { space, border, tokens } }) => css`
    position: relative;
    border-radius: ${space.sm};
    border: ${border} ${tokens.text.muted};
    background-color: ${tokens.background.surface};
    height: 100%;
    width: 100%;

    :hover,
    :focus-within {
      border: ${border} ${tokens.accent};
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

export interface TileProps {
  rect: TileRect
  onRectChange: SetState<TileRect>
  orientation: Orientation
  minHeight?: number
  minWidth?: number
  editing?: boolean
}

export const Tile = ({
  orientation = defaultOrientation,
  rect = defaultRect,
  onRectChange,
  minHeight = gridSize * 4,
  minWidth = gridSize * 4,
  editing,
  children,
}: PropsWithChildren<TileProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  const anchor = useAnchor(orientation)

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
    <MovableContainer
      snap={gridSize}
      onMove={handleMove}
      style={{ ...size, ...position }}
      disabled={!editing}
    >
      <Content ref={ref}>
        <Resizable
          snap={gridSize}
          onResize={handleResize}
          disabled={!editing}
        />
        {children}
      </Content>
    </MovableContainer>
  )
}
