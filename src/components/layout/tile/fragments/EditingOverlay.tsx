import Color from "color"

import { TILE_EDITING_Z_INDEX } from "~/components/base"
import { Icon, Move } from "~/components/primitives"

import { MoveButton } from "./MoveButton"

const Overlay = styled.div(
  ({ theme: { space, raw } }) => css`
    position: absolute;
    inset: 0;
    z-index: ${TILE_EDITING_Z_INDEX};

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${space.sm};

    background-color: ${Color(raw.tokens.background.surface)
      .alpha(0.5)
      .toString()};
  `
)

interface EditingOverlayProps {
  editing: boolean
  draggableButtonProps: object
  isDragging: boolean
}

export const EditingOverlay = ({
  editing,
  draggableButtonProps,
  isDragging,
}: EditingOverlayProps) =>
  !editing ? null : (
    <Overlay>
      <MoveButton
        {...draggableButtonProps}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <Icon icon={Move} size="lg" />
      </MoveButton>
    </Overlay>
  )
