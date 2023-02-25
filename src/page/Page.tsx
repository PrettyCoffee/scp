import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { css as createStyles } from "@emotion/css"

import {
  Circle,
  Github,
  Grid,
  Header,
  IconButton,
  Measurement,
  Plus,
  Spacing,
  Text,
  Tile,
  TileRect,
  ToggleButton,
  useResizeObserver,
} from "~/components"
import { WidgetUserConfig, useSpacing, useCustomCss, useWidgets } from "~/store"

import { GeneralSettingsMenu } from "./general-settings"

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

interface UserTileProps extends WidgetUserConfig {
  editing: boolean
  parentSize: Measurement
}

const UserTile = ({ editing, parentSize, ...widget }: UserTileProps) => {
  const [state, setState] = useState(widget)
  const { update } = useWidgets()
  const spacing = useSpacing()
  const customCss = useCustomCss()

  const setRect = useCallback((rect: TileRect) => {
    setState(state => ({ ...state, rect }))
  }, [])

  useEffect(() => {
    update(state.id, state)
  }, [state, update])

  const className = useMemo(() => {
    const shared = createStyles(customCss.value.tile)
    const custom = createStyles(state.customCss)
    return `${shared} ${custom}`
  }, [customCss.value.tile, state.customCss])

  return (
    <Tile
      gridSize={spacing.value.gridSize}
      parentSize={parentSize}
      className={className}
      {...state}
      onRectChange={setRect}
      editing={editing}
    >
      <Text.Medium color="muted">Tile {`#${state.id}`}</Text.Medium>
    </Tile>
  )
}

interface WidgetsProps {
  editing: boolean
  parentSize: Measurement
}

const Widgets = ({ editing, parentSize }: WidgetsProps) => {
  const w = useWidgets()

  // prevent transition to initial position
  if (parentSize.height === 0 && parentSize.width === 0) return null

  return (
    <>
      {w.value.map(widget => (
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
    <Spacing xAxis="sm">
      <Text.Small>{time}</Text.Small>
      <Text.Small color="muted"> | </Text.Small>
      <Text.Small>{date}</Text.Small>
    </Spacing>
  )
}

const Relative = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  /* prevents scrolling out of view with @dnd-kit */
  overflow: hidden;
`

const Wrapper = styled.div<{ gap?: number }>(
  ({ gap }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: ${gap}px;
  `
)

const WorkspaceNavigation = () => {
  const [workspaces, setWorkspaces] = useState([
    { name: "Work", active: true },
    { name: "Private", active: false },
    { name: "Planning", active: false },
    { name: "Horny Jail", active: false },
  ])

  const setActive = (name: string) =>
    setWorkspaces(workspaces =>
      workspaces.map(w => ({ ...w, active: w.name === name }))
    )

  return (
    <>
      {workspaces.map(({ name, active }) => (
        <ToggleButton
          key={name}
          onClick={() => setActive(name)}
          icon={Circle}
          caption={name}
          look="compact"
          fill={active}
          pressed={active}
        />
      ))}
      <IconButton icon={Plus} caption="Create a workspace" look="compact" />
    </>
  )
}

const HeaderPadding = styled.div<{ padding: number }>(
  ({ padding }) => css`
    padding: ${padding}px;
    padding-bottom: 0;
  `
)

const WindowPadding = styled.div<{ padding: number }>(
  ({ padding }) => css`
    padding: ${padding}px;
    padding-top: 0;
    flex: 1;
  `
)

export const Page = () => {
  const spacing = useSpacing()
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const parentSize = useResizeObserver(ref)

  return (
    <Wrapper gap={spacing.value.headerGap}>
      <HeaderPadding padding={spacing.value.headerPadding}>
        <Header.Root>
          <Header.Start>
            <WorkspaceNavigation />
          </Header.Start>
          <Header.Center>
            <Clock />
          </Header.Center>
          <Header.End>
            <IconButton
              icon={Github}
              caption="Github repository"
              href="https://github.com/PrettyCoffee/scp"
              look="compact"
              target="_blank"
            />
            <ToggleButton
              pressed={editing}
              onClick={setEditing}
              icon={Grid}
              caption="Edit widget positions and sizes"
              look="compact"
            />
            <GeneralSettingsMenu />
          </Header.End>
        </Header.Root>
      </HeaderPadding>
      <WindowPadding padding={spacing.value.windowPadding}>
        <Relative ref={ref}>
          {editing && <BgCross />}
          <Widgets editing={editing} parentSize={parentSize} />
        </Relative>
      </WindowPadding>
    </Wrapper>
  )
}
