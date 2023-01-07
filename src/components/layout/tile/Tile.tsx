import { PropsWithChildren, useRef, useState } from "react"

import { gridSize } from "../../../App"
import { Position } from "../../base"
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
    border: ${border.primary};
    background-color: ${tokens.background.surface};
    height: 100%;
    width: 100%;
  `}
`

export type TileRect = Pick<DOMRect, "height" | "width" | "x" | "y">

export interface TileProps {
  orientation?: Orientation
  minHeight?: number
  minWidth?: number
  editing?: boolean
}

export const Tile = ({
  orientation = {
    vertical: "center",
    horizontal: "center",
  },
  minHeight = gridSize * 4,
  minWidth = gridSize * 4,
  editing,
  children,
}: PropsWithChildren<TileProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  const anchor = useAnchor(orientation)
  const [rect, setRect] = useState<TileRect>({
    x: 0,
    y: 0,
    height: minHeight,
    width: minWidth,
  })

  const handleResize = (resize: ResizeItem) =>
    setRect(rect =>
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
    setRect(rect => ({ ...rect, x: rect.x + x, y: rect.y + y }))

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
