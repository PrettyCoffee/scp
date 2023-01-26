import { Dispatch, HTMLAttributes, SetStateAction } from "react"

import { Theme } from "@emotion/react"

export type Side = "top" | "bottom" | "left" | "right"

export interface SideProp {
  side: Side
}

export interface Measurement {
  width: number
  height: number
}

export interface Position {
  x: number
  y: number
}

export interface ClassNameProp {
  className?: string
}

export interface ThemeProp {
  theme: Theme
}

export interface DisabledProp {
  disabled?: boolean
}

export type DivProps = HTMLAttributes<HTMLDivElement>

export type SetState<T> = Dispatch<SetStateAction<T>>

export interface RefProp {
  setRef?: (ref: Element | null) => void
}
