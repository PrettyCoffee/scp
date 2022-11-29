import { useState } from "react"

import { gridSize } from "../App"
import {
  Resizable,
  ResizeItem,
  Side,
  Movable,
  exceedsWindow,
} from "../components"

const Tile = styled.div`
  ${({ theme: { space, border, tokens } }) => css`
    position: relative;
    border-radius: ${space.sm};
    border: ${border.primary};
    background-color: ${tokens.background.surface};
    height: 100%;
    width: 100%;
  `}
`

const MovableContainer = styled(Movable)`
  ${({ theme: { space } }) => css`
    transition: 0.1s;
    padding: ${space.xs};
  `}
`

const ResizableTile = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({
    height: gridSize * 2,
    width: gridSize * 2,
  })

  const handleResize = ({ top, bottom, left, right }: ResizeItem) => {
    const { height, width } = size
    const boundaries: Record<Side, number> = {
      top: pos.y - top,
      left: pos.x - left,
      bottom: pos.y + height + bottom,
      right: pos.x + width + right,
    }
    if (exceedsWindow(boundaries)) return

    if (top !== 0 || left !== 0)
      setPos({
        x: pos.x - left,
        y: pos.y - top,
      })

    setSize({
      height: height + top + bottom,
      width: width + left + right,
    })
  }

  return (
    <MovableContainer
      snap={gridSize}
      onMove={({ x, y }) => setPos(old => ({ x: old.x + x, y: old.y + y }))}
      style={{ ...size, top: pos.y, left: pos.x, transition: "0.1s" }}
    >
      <Tile>
        <Resizable snap={gridSize} onResize={handleResize}>
          Tile
        </Resizable>
      </Tile>
    </MovableContainer>
  )
}

export const Page = () => {
  return (
    <>
      <ResizableTile />
      <ResizableTile />
    </>
  )
}
