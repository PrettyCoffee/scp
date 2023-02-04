import { AccordionRootProps, Collapse, Expand, IconButton } from "~/components"

export const ExpandButton = ({
  open,
  onOpenChange,
}: Pick<AccordionRootProps, "open" | "onOpenChange">) =>
  open === "none" ? (
    <IconButton
      caption="Expand all options"
      icon={Expand}
      look="compact"
      onClick={() => onOpenChange("all")}
    />
  ) : (
    <IconButton
      caption="Collapse all options"
      icon={Collapse}
      look="compact"
      onClick={() => onOpenChange("none")}
    />
  )
