import { IconDefinition, IconBase } from "./_IconBase"

/* Custom icon */
export const Collapse: IconDefinition = props => (
  <IconBase {...props}>
    <polyline points="9 5 12 8 15 5" />
    <polyline points="15 19 12 16 9 19" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="12" y1="1" x2="12" y2="8" />
    <line x1="12" y1="16" x2="12" y2="23" />
  </IconBase>
)
