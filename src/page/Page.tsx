import { useCallback, useMemo, useState } from "react"

import { css as createStyles } from "@emotion/css"

import { Edit, SetState, Tile, TileRect, ToggleButton } from "../components"
import { gridSize } from "../config"
import { theme } from "../theme/ThemeProvider"
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

  const className = useMemo(
    () => createStyles`${state.customCss}`,
    [state.customCss]
  )

  return (
    <Tile
      className={className}
      {...state}
      onRectChange={setRect}
      editing={editing}
    >
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
    customCss: `
      --tokens-accent: ${theme.color.red};
    `,
  },
  {
    id: "2",
    orientation: { horizontal: "center", vertical: "top" },
    rect: { ...defaultRect, x: gridSize * -2 },
    ...sharedProps,
    customCss: `
      --tokens-accent: ${theme.color.flamingo};
    `,
  },
  {
    id: "3",
    orientation: { horizontal: "right", vertical: "top" },
    rect: defaultRect,
    ...sharedProps,
    customCss: `
      --tokens-accent: ${theme.color.yellow};
    `,
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
  const [editing, setEditing] = useState(false)

  return (
    <WidgetStoreProvider initial={defaultTiles}>
      {editing && <Cross />}
      <div style={{ position: "fixed", zIndex: 1, right: 8, top: 8 }}>
        <ToggleButton
          pressed={editing}
          onClick={setEditing}
          icon={Edit}
          caption="Start editing widgets"
        />
      </div>
      <Widgets editing={editing} />
    </WidgetStoreProvider>
  )
}
