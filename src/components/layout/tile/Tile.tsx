import { PropsWithChildren, useRef } from "react"

import {
  ClassNameProp,
  Measurement,
  Position,
  SetState,
} from "~/components/base"
import {
  Movable,
  Resizable,
  ResizeItem,
  ErrorBoundary,
} from "~/components/utility/"
import { useSpacing } from "~/store"

import { EditingOverlay } from "./fragments/EditingOverlay"
import { getResizedRectangle } from "./utils/getResizedRectangle"
import { useAnchor, Orientation } from "./utils/useAnchor"

const MovableContainer = styled.div(() => {
  const spacing = useSpacing()
  return css`
    padding: calc(${spacing.value.widgetGap}px / 2);
    position: absolute;
  `
})

const Content = styled.div`
  ${({ theme: { space, border, tokens, shadow } }) => css`
    position: relative;
    border-radius: ${space.sm};
    background-color: ${tokens.background.surface};
    height: 100%;
    width: 100%;

    box-shadow: ${shadow.medium};

    outline-offset: calc(-1 * ${space["3xs"]});
    outline: ${border} ${tokens.text.muted};
    :hover,
    :focus-within {
      outline: ${border} ${tokens.accent};
    }
  `}
`

export type TileRect = Pick<DOMRect, "height" | "width" | "x" | "y">

const defaultOrientation: Orientation = {
  vertical: "center",
  horizontal: "center",
}

export interface TileProps extends ClassNameProp {
  rect: TileRect
  onRectChange: SetState<TileRect>
  orientation: Orientation
  gridSize: number
  parentSize: Measurement
  minHeight?: number
  minWidth?: number
  editing?: boolean
}

export const Tile = ({
  gridSize,
  orientation = defaultOrientation,
  rect,
  onRectChange,
  parentSize,
  minHeight = gridSize * 4,
  minWidth = gridSize * 4,
  editing,
  children,
  className,
}: PropsWithChildren<TileProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  const anchor = useAnchor(orientation, parentSize)

  const handleMove = ({ x, y }: Position) =>
    onRectChange(rect => ({ ...rect, x: rect.x + x, y: rect.y + y }))

  const handleResize = (resize: ResizeItem) =>
    onRectChange(rect =>
      getResizedRectangle({
        ref,
        rect,
        resize,
        anchor,
        minHeight,
        minWidth,
      })
    )

  const size = {
    height: rect.height,
    width: rect.width,
  }

  const position = {
    [anchor.sideX]:
      anchor.sideX === "right" ? anchor.x - rect.x : anchor.x + rect.x,
    [anchor.sideY]:
      anchor.sideY === "bottom" ? anchor.y - rect.y : anchor.y + rect.y,
  }

  return (
    <ErrorBoundary>
      <Movable snapSize={gridSize} disabled={!editing} onMoveEnd={handleMove}>
        {({ buttonProps, draggableProps, transform, isDragging }) => (
          <MovableContainer
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px)`,
              ...size,
              ...position,
            }}
            {...draggableProps}
          >
            <Content ref={ref} className={className}>
              <Resizable
                snap={gridSize}
                onResize={handleResize}
                disabled={!editing}
              />
              {children}
              <EditingOverlay
                editing={!!editing}
                draggableButtonProps={buttonProps}
                isDragging={isDragging}
              />
            </Content>
          </MovableContainer>
        )}
      </Movable>
    </ErrorBoundary>
  )
}
