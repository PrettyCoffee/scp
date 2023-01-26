import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { css as createStyles } from "@emotion/css"

import {
  Grid,
  Header,
  Measurement,
  SetState,
  Settings,
  Tile,
  TileRect,
  ToggleButton,
  useResizeObserver,
} from "../components"
import { useGeneralStore } from "../store"
import { useWidgetStore, WidgetConfig } from "../store/WidgetStore"

const BgCross = styled.div(
  ({ theme: { tokens, space } }) => css`
    --border: 1px solid ${tokens.text.muted};

    ::before,
    ::after {
      content: "";
      position: absolute;
      inset: 0;
    }

    ::before {
      border-top: var(--border);
      border-bottom: var(--border);
      top: 50%;
      height: 0;
      margin-top: -1px;
    }

    ::after {
      border-left: var(--border);
      border-right: var(--border);
      top: calc(${space.md} * -2.5);
      left: 50%;
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

const Padding = styled.div(
  ({ theme: { space } }) => css`
    padding: ${space.sm};
    font-size: calc(${space.md} * 0.8);
  `
)

const Clock = () => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const time = now.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })

  const date = now.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    weekday: "short",
  })

  return (
    <Padding>
      {time} | {date}
    </Padding>
  )
}

const Relative = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const Page = () => {
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const parentSize = useResizeObserver(ref)

  return (
    <Wrapper>
      <Header.Root>
        <Header.Center>
          <Clock />
        </Header.Center>
        <Header.End>
          <ToggleButton
            pressed={editing}
            onClick={setEditing}
            icon={Grid}
            caption="Start editing widgets"
            look="compact"
          />
          <ToggleButton
            pressed={editing}
            onClick={setEditing}
            icon={Settings}
            caption="Start editing widgets"
            look="compact"
          />
        </Header.End>
      </Header.Root>
      <Relative ref={ref}>
        {editing && <BgCross />}
        <Widgets editing={editing} parentSize={parentSize} />
      </Relative>
    </Wrapper>
  )
}
