import { PropsWithChildren } from "react"

import { DisabledProp, Side } from "../../base/baseProps"
import { ResizeHandle } from "./ResizeHandle"

export type ResizeItem = Record<Side, number>

export interface ResizableProps extends DisabledProp {
  onResize?: (args: ResizeItem) => void
  snap?: number
}

export const Resizable = ({
  children,
  onResize,
  snap = 0,
  disabled,
}: PropsWithChildren<ResizableProps>) => {
  const shared = {
    onResize,
    snap,
  }

  return (
    <>
      {children}
      {!disabled && (
        <>
          <ResizeHandle side="top" {...shared} />
          <ResizeHandle side="right" {...shared} />
          <ResizeHandle side="bottom" {...shared} />
          <ResizeHandle side="left" {...shared} />
        </>
      )}
    </>
  )
}
