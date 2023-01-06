import { exceedsWindow, Position, Side, Size } from "../../../base"
import { ResizeItem } from "../../../utility"

const resizeExceedsWindow = (
  { top, bottom, left, right }: ResizeItem,
  pos: Position,
  size: Size
) => {
  const newRect: Record<Side, number> = {
    top: pos.y - top,
    left: pos.x - left,
    bottom: pos.y + size.height + bottom,
    right: pos.x + size.width + right,
  }
  return exceedsWindow(newRect)
}

interface Args {
  resize: ResizeItem
  size: Size
  pos: Position
}

export const getResizedRectangle = ({ resize, pos, size }: Args) => {
  const { top, bottom, left, right } = resize

  if (resizeExceedsWindow(resize, pos, size))
    return {
      ...size,
      ...pos,
    }

  const x = pos.x - left
  const y = pos.y - top

  const height = size.height + top + bottom
  const width = size.width + left + right

  return {
    x,
    y,
    height,
    width,
  }
}
