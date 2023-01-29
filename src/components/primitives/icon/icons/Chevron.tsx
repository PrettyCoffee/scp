import { IconDefinition, IconBase } from "./_IconBase"

const Down: IconDefinition = props => (
  <IconBase {...props}>
    <polyline points="6 9 12 15 18 9" />
  </IconBase>
)

const Left: IconDefinition = props => (
  <IconBase {...props}>
    <polyline points="15 18 9 12 15 6" />
  </IconBase>
)

const Up: IconDefinition = props => (
  <IconBase {...props}>
    <polyline points="18 15 12 9 6 15" />
  </IconBase>
)

const Right: IconDefinition = props => (
  <IconBase {...props}>
    <polyline points="9 18 15 12 9 6" />
  </IconBase>
)

export const Chevron = {
  Down,
  Up,
  Right,
  Left,
}
