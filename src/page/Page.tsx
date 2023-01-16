import { useCallback, useMemo, useState } from "react"

import { css as createStyles } from "@emotion/css"

import { Edit, SetState, Tile, TileRect, ToggleButton } from "../components"
import { Store } from "../store"
import { useWidgetStore, WidgetConfig } from "../store/WidgetStore"

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
    <Store>
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
    </Store>
  )
}
