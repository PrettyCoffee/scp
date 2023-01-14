import { useCallback, useState } from "react"

import { SetState, Tile, TileRect } from "../components"
import { gridSize } from "../config"
import {
  useWidgetStore,
  WidgetConfig,
  WidgetStoreProvider,
} from "./WidgetStore"

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

interface UserTileProps extends WidgetConfig {
  editing: boolean
}

const UserTile = ({ editing, ...widget }: UserTileProps) => {
  const { updateWidget } = useWidgetStore()
  const [state, setState] = useState(widget)

  const setRect: SetState<TileRect> = useCallback(
    value => {
      setState(state => {
        const rect = typeof value === "function" ? value(state.rect) : value
        const newState = { ...state, rect }
        updateWidget(newState)
        return newState
      })
    },
    [updateWidget]
  )

  return (
    <Tile {...state} onRectChange={setRect} editing={editing}>
      Tile {`#${state.id}`}
    </Tile>
  )
}

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

const defaultTiles: WidgetConfig[] = [
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

const Widgets = ({ editing }: { editing: boolean }) => {
  const { widgets } = useWidgetStore()

  return (
    <>
      {widgets.map(widget => (
        <UserTile key={widget.id} editing={editing} {...widget} />
      ))}
    </>
  )
}

export const Page = () => {
  const editing = true

  return (
    <WidgetStoreProvider initial={defaultTiles}>
      {editing && <Cross />}
      <Widgets editing={editing} />
    </WidgetStoreProvider>
  )
}
