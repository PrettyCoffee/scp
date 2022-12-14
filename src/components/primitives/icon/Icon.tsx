import { spacing } from "../../../theme/spacing"
import { ClassNameProp } from "../../base"
import { IconDefinition, IconBaseProps } from "./icons/_IconBase"

type IconSize = "sm" | "md" | "lg" | "xl"

const sizes: Record<IconSize, number> = {
  sm: spacing.px.md * 0.75,
  md: spacing.px.md,
  lg: spacing.px.md * 1.5,
  xl: spacing.px.lg,
}

const getIconSize = (size?: IconSize | number) =>
  typeof size === "number" ? size : sizes[size ?? "md"]

export interface IconProps extends Pick<IconBaseProps, "color">, ClassNameProp {
  icon: IconDefinition
  size?: IconSize | number
}

export const Icon = ({ icon: Icon, size, ...delegated }: IconProps) => (
  <Icon size={getIconSize(size)} {...delegated} />
)
