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

export interface TileProps {
  orientation?: Orientation
  minHeight?: number
  minWidth?: number
}

export const Tile = ({
  orientation = {
    vertical: "center",
    horizontal: "center",
  },
  minHeight = gridSize * 4,
  minWidth = gridSize * 4,
  children,
}: PropsWithChildren<TileProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  const anchor = useAnchor(orientation)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({
    height: minHeight,
    width: minWidth,
  })

  const handleResize = (resize: ResizeItem) => {
    const { height, width, x, y } = getResizedRectangle({
      ref,
      pos,
      resize,
      size,
      anchor,
      minHeight,
      minWidth,
    })
    setPos({
      x,
      y,
    })
    setSize({
      height,
      width,
    })
  }

  const handleMove = ({ x, y }: Position) =>
    setPos(old => ({ x: old.x + x, y: old.y + y }))

  const position = {
    [anchor.sideX]:
      anchor.sideX === "right" ? anchor.x - pos.x : anchor.x + pos.x,
    [anchor.sideY]:
      anchor.sideY === "bottom" ? anchor.y - pos.y : anchor.y + pos.y,
  }

  return (
    <MovableContainer
      snap={gridSize}
      onMove={handleMove}
      style={{ ...size, ...position }}
    >
      <Content ref={ref}>
        <Resizable snap={gridSize} onResize={handleResize} />
        {children}
      </Content>
    </MovableContainer>
  )
}
