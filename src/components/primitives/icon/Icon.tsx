import { spacing } from "~/theme/spacing"

import { IconDefinition, IconBaseProps } from "./icons/_IconBase"
import { ClassNameProp } from "../../base"
import { ErrorBoundary } from "../../utility"

type IconSize = "sm" | "md" | "lg" | "xl"

const sizes: Record<IconSize, number> = {
  sm: spacing.px.md * 0.75,
  md: spacing.px.md,
  lg: spacing.px.md * 1.5,
  xl: spacing.px.lg,
}

const getIconSize = (size?: IconSize | number) =>
  typeof size === "number" ? size : sizes[size ?? "md"]

export interface IconProps
  extends Pick<IconBaseProps, "color" | "fill">,
    ClassNameProp {
  icon: IconDefinition
  size?: IconSize | number
}

export const Icon = ({ icon: Icon, size, ...delegated }: IconProps) => (
  <ErrorBoundary>
    <Icon size={getIconSize(size)} {...delegated} />
  </ErrorBoundary>
)
