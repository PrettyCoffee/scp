import { PropsWithChildren, useState } from "react"

import { gridSize } from "../../../App"
import { Position } from "../../base"
import { Resizable, ResizeItem, Movable } from "../../utility"
import { getResizedRectangle } from "./utils/getResizedRectangle"

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

export const Tile = ({ children }: PropsWithChildren) => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({
    height: gridSize * 2,
    width: gridSize * 2,
  })

  const handleResize = (resize: ResizeItem) => {
    const { height, width, x, y } = getResizedRectangle({
      pos,
      resize,
      size,
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
    top: pos.y,
    left: pos.x,
  }

  return (
    <MovableContainer
      snap={gridSize}
      onMove={handleMove}
      style={{ ...size, ...position }}
    >
      <Content>
        <Resizable snap={gridSize} onResize={handleResize}>
          {children}
        </Resizable>
      </Content>
    </MovableContainer>
  )
}
