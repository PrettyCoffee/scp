import { useRef } from "react"

import { Side } from "../../../base"
import { ResizableProps } from "../Resizable"
import { useResize } from "../utils/useResize"
import { sharedHandleStyles } from "./sharedHandleStyles"

const Handle = styled.button<DiagonalHandleProps & { isResizing: boolean }>`
  ${sharedHandleStyles}
  ${({ side }) => css`
    ::before, ::after {
      content: "";
      ${side[0]}: var(--handle-offset);
      ${side[1]}: var(--handle-offset);
    }

    ::before {
      height: 0.75rem;
      border-${side[1]}: var(--border);
    }

    ::after {
      width: 0.75rem;
      border-${side[0]}: var(--border);
    }
  `}
`

interface DiagonalHandleProps
  extends Pick<ResizableProps, "onResize" | "snap"> {
  side: [Side, Side]
}

export const CornerHandle = ({ side, onResize, snap }: DiagonalHandleProps) => {
  const ref = useRef<HTMLButtonElement>(null)

  const { isResizing } = useResize({
    ref,
    onResize,
    side,
    snap,
  })

  return <Handle ref={ref} side={side} isResizing={isResizing} />
}
