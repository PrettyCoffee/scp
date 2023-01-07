import { useState } from "react"

import { Tile, TileProps } from "../components"
import { gridSize } from "../config"

const Cross = styled.div(
  ({ theme: { tokens } }) => css`
    --border: 1px solid ${tokens.text.muted};

    ::before,
    ::after {
      content: "";
      position: fixed;
      inset: 0;
    }

    ::before {
      border-top: var(--border);
      border-bottom: var(--border);
      top: 50vh;
      height: 0;
      margin-top: -1px;
    }

    ::after {
      border-left: var(--border);
      border-right: var(--border);
      left: 50vw;
      margin-left: -1px;
      width: 0px;
    }
  `
)

interface UserTileProps extends Required<Omit<TileProps, "onRectChange">> {
  id: string
}

const UserTile = ({ id, rect: configRect, ...delegated }: UserTileProps) => {
  const [rect, setRect] = useState(configRect)
  return (
    <Tile {...delegated} onRectChange={setRect} rect={rect}>
      Tile {`#${id}`}
    </Tile>
  )
}

type UserTileConfig = Omit<UserTileProps, "editing">

const sharedProps = {
  minHeight: gridSize * 4,
  minWidth: gridSize * 4,
}

const defaultRect = {
  height: gridSize * 4,
  width: gridSize * 4,
  x: 0,
  y: 0,
}

const defaultTiles: UserTileConfig[] = [
  {
    id: "1",
    orientation: { horizontal: "left", vertical: "top" },
    rect: defaultRect,
    ...sharedProps,
  },
  {
    id: "2",
    orientation: { horizontal: "center", vertical: "top" },
    rect: { ...defaultRect, x: gridSize * -2 },
    ...sharedProps,
  },
  {
    id: "3",
    orientation: { horizontal: "right", vertical: "top" },
    rect: defaultRect,
    ...sharedProps,
  },

  {
    id: "4",
    orientation: { horizontal: "left", vertical: "center" },
    rect: { ...defaultRect, y: gridSize * -2 },
    ...sharedProps,
  },
  {
    id: "5",
    orientation: { horizontal: "center", vertical: "center" },
    rect: { ...defaultRect, x: gridSize * -2, y: gridSize * -2 },
    ...sharedProps,
  },
  {
    id: "6",
    orientation: { horizontal: "right", vertical: "center" },
    rect: { ...defaultRect, y: gridSize * -2 },
    ...sharedProps,
  },

  {
    id: "7",
    orientation: { horizontal: "left", vertical: "bottom" },
    rect: defaultRect,
    ...sharedProps,
  },
  {
    id: "8",
    orientation: { horizontal: "center", vertical: "bottom" },
    rect: { ...defaultRect, x: gridSize * -2 },
    ...sharedProps,
  },
  {
    id: "9",
    orientation: { horizontal: "right", vertical: "bottom" },
    rect: defaultRect,
    ...sharedProps,
  },
]

export const Page = () => {
  const editing = true
  const [tiles, setTiles] = useState<UserTileConfig[]>(defaultTiles)

  return (
    <>
      {editing && <Cross />}
      {tiles.map(tile => (
        <UserTile key={tile.id} editing={editing} {...tile} />
      ))}
    </>
  )
}
