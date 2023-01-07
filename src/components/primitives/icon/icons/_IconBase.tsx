/* eslint-disable check-file/filename-naming-convention */
import { FC, PropsWithChildren } from "react"

export interface IconBaseProps {
  color?: string
  size?: number
  className?: string
}

export type IconDefinition = FC<IconBaseProps>

const getStyle = (size: number) => ({
  height: size,
  minHeight: size,
  width: size,
  minWidth: size,
})

export const IconBase = ({
  color = "currentColor",
  size = 24,
  children,
  ...rest
}: PropsWithChildren<IconBaseProps>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={getStyle(size)}
    {...rest}
  >
    {children}
  </svg>
)
