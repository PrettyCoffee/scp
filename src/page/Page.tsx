import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { css as createStyles } from "@emotion/css"

import {
  Edit,
  Measurement,
  SetState,
  Tile,
  TileRect,
  ToggleButton,
  useResizeObserver,
} from "../components"
import { useGeneralStore } from "../store"
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
  parentSize: Measurement
}

const UserTile = ({ editing, parentSize, ...widget }: UserTileProps) => {
  const { updateWidget } = useWidgetStore()
  const [state, setState] = useState(widget)
  const [{ gridSize }] = useGeneralStore()

  useEffect(() => {
    updateWidget(state)
  }, [state, updateWidget])

  const setRect: SetState<TileRect> = useCallback(value => {
    setState(state => {
      const rect = typeof value === "function" ? value(state.rect) : value
      return { ...state, rect }
    })
  }, [])

  const className = useMemo(
    () => createStyles`${state.customCss}`,
    [state.customCss]
  )

  return (
    <Tile
      gridSize={gridSize}
      parentSize={parentSize}
      className={className}
      {...state}
      onRectChange={setRect}
      editing={editing}
    >
      Tile {`#${state.id}`}
    </Tile>
  )
}

interface WidgetsProps {
  editing: boolean
  parentSize: Measurement
}

const Widgets = ({ editing, parentSize }: WidgetsProps) => {
  const { widgets } = useWidgetStore()

  // prevent transition to initial position
  if (parentSize.height === 0 && parentSize.width === 0) return null

  return (
    <>
      {widgets.map(widget => (
        <UserTile
          key={widget.id}
          editing={editing}
          parentSize={parentSize}
          {...widget}
        />
      ))}
    </>
  )
}

const Relative = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

export const Page = () => {
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const parentSize = useResizeObserver(ref)

  return (
    <Relative ref={ref}>
      {editing && <Cross />}
      <div style={{ position: "fixed", zIndex: 1, right: 8, top: 8 }}>
        <ToggleButton
          pressed={editing}
          onClick={setEditing}
          icon={Edit}
          caption="Start editing widgets"
        />
      </div>
      <Widgets editing={editing} parentSize={parentSize} />
    </Relative>
  )
}
