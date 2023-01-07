import { Side, ThemeProp } from "../../../base"
import { getCursorBySide, isHorizontal } from "../utils/getCursorBySide"

const attatchHandle = ({ side, theme: { space } }: HandleProps) => {
  const margin = `calc(-1 * ${space.sm})`
  const clickSize = "1.75rem"

  if (Array.isArray(side))
    return css({
      [side[0]]: margin,
      [side[1]]: margin,
      height: clickSize,
      width: clickSize,
      zIndex: 1,
    })

  const horizontal = isHorizontal(side)
  const [start, end] = horizontal ? ["top", "bottom"] : ["left", "right"]
  const [thickness, length] = horizontal
    ? ["width", "height"]
    : ["height", "width"]
  return css({
    [side]: margin,
    [start]: 0,
    [end]: 0,
    [thickness]: clickSize,
    [length]: "100%",
    zIndex: 0,
  })
}

export interface HandleProps extends ThemeProp {
  side: Side | [Side, Side]
  isResizing: boolean
}

export const sharedHandleStyles = (props: HandleProps) => css`
  --border: 0.1875rem solid ${props.theme.color.secondary};
  --handle-offset: 0.75rem;

  ${attatchHandle(props)}
  background: transparent;
  padding: 0;
  border: none;
  position: absolute;
  cursor: ${getCursorBySide(props.side)};

  ::before,
  ::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-radius: 50vh;
    border-color: ${props.theme.color.secondary};
  }

  transition: opacity 0.2s ease;
  opacity: ${props.isResizing ? "1" : "0.3"};
  :hover {
    opacity: 1;
  }
`
