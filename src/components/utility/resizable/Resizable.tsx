import { DisabledProp, Side } from "../../base/baseProps"
import { CornerHandle } from "./fragments/CornerHandle"
import { SideHandle } from "./fragments/SideHandle"

export type ResizeItem = Record<Side, number>

export interface ResizableProps extends DisabledProp {
  onResize?: (args: ResizeItem) => void
  snap?: number
}

export const Resizable = ({ onResize, snap = 0, disabled }: ResizableProps) => {
  const shared = {
    onResize,
    snap,
  }

  return (
    <>
      {!disabled && (
        <>
          <CornerHandle side={["top", "left"]} {...shared} />
          <SideHandle side="top" {...shared} />
          <CornerHandle side={["top", "right"]} {...shared} />

          <SideHandle side="left" {...shared} />
          <SideHandle side="right" {...shared} />

          <CornerHandle side={["bottom", "left"]} {...shared} />
          <SideHandle side="bottom" {...shared} />
          <CornerHandle side={["bottom", "right"]} {...shared} />
        </>
      )}
    </>
  )
}
