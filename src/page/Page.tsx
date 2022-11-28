import { useState } from "react"

import { gridSize } from "../App"
import { Resizable, ResizeItem } from "../components"

const Tile = styled.div`
  ${({ theme: { space, border, tokens } }) => css`
    position: relative;
    transition: 0.1s;
    border-radius: ${space.sm};
    border: ${border.primary};
    background-color: ${tokens.background.surface};
  `}
`

const ResizableTile = () => {
  const [size, setSize] = useState({
    height: gridSize * 2,
    width: gridSize * 2,
  })

  const handleResize = ({ top, bottom, left, right }: ResizeItem) => {
    setSize(({ height, width }) => ({
      height: height + top + bottom,
      width: width + left + right,
    }))
  }

  return (
    <Tile style={size}>
      <Resizable snap={gridSize} onResize={handleResize}>
        Tile
      </Resizable>
    </Tile>
  )
}

export const Page = () => {
  return <ResizableTile />
}
