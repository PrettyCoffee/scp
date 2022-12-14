import { useRef } from "react"

import { SideProp } from "../../../base"
import { ResizableProps } from "../Resizable"
import { isHorizontal } from "../utils/getCursorBySide"
import { useResize } from "../utils/useResize"
import { sharedHandleStyles } from "./sharedHandleStyles"

const Handle = styled.button<SideProp & { isResizing: boolean }>`
  ${sharedHandleStyles}
  ${({ theme: { space }, side }) => {
    const horizontal = isHorizontal(side)
    const length = horizontal ? "height" : "width"
    return css`
      display: flex;
      align-items: center;
      justify-content: center;

      ::before {
        content: "";
        ${side}: var(--handle-offset);
        ${length}: min(calc(100% - 2rem), ${space.lg});
        border-${side}: var(--border);
      }
    `
  }}
`

export const SideHandle = ({
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
