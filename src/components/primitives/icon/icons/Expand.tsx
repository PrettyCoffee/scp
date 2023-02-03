import { IconDefinition, IconBase } from "./_IconBase"

/* Custom icon */
export const Expand: IconDefinition = props => (
  <IconBase {...props}>
    <polyline points="9 4 12 1 15 4" />
    <polyline points="15 20 12 23 9 20" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="12" y1="1" x2="12" y2="8" />
    <line x1="12" y1="16" x2="12" y2="23" />
  </IconBase>
)
