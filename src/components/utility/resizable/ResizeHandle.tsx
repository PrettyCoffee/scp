import { useRef } from "react"

import { Side, SideProp, ThemeProp } from "../../base/baseProps"
import { ResizableProps } from "./Resizable"
import { useResize } from "./useResize"

const isHorizontal = (side: Side) => side === "left" || side === "right"

export const getHandleBySide = (side: Side) =>
  isHorizontal(side) ? "ew-resize" : "ns-resize"

const handlePosition = ({ side, theme: { space } }: SideProp & ThemeProp) => {
  const horizontal = isHorizontal(side)
  const [start, end] = horizontal ? ["top", "bottom"] : ["left", "right"]
  const handle = getHandleBySide(side)
  const [thickness, length] = horizontal
    ? ["width", "height"]
    : ["height", "width"]
  return css({
    position: "absolute",
    [side]: `-${space.sm}`,
    [start]: 0,
    [end]: 0,
    [thickness]: space.md,
    [length]: "100%",
    cursor: handle,
  })
}

const Handle = styled.button<SideProp & { isResizing: boolean }>`
  ${handlePosition}
  ${({ theme: { color, space }, side, isResizing }) => {
    const horizontal = isHorizontal(side)
    const [thickness, length] = horizontal
      ? ["width", "height"]
      : ["height", "width"]
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      padding: 0;
      border: none;

      ::before {
        content: "";
        position: relative;
        display: block;
        background-color: transparent;
        transition: background-color 0.2s ease;
        border-radius: 50vh;

        ${side}: ${space.xs};
        ${length}: min(75%, ${space.xl});
        ${thickness}: ${space.xs};
      }

      ${isResizing &&
      css`
        ::before {
          background-color: ${color.secondary};
        }
      `}
      :hover::before {
        background-color: ${color.secondary};
      }
    `
  }}
`

export const ResizeHandle = ({
  side,
  onResize,
  snap,
}: SideProp & Pick<ResizableProps, "onResize" | "snap">) => {
  const ref = useRef<HTMLButtonElement>(null)

  const { isResizing } = useResize({
    ref,
    onResize,
    side,
    snap,
  })

  return <Handle ref={ref} side={side} isResizing={isResizing} />
}
