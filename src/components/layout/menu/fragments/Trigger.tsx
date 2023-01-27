import { ReferenceType } from "@floating-ui/react"

import { ErrorBoundary } from "../../../utility"
import { useMenuContext } from "../utils/MenuContext"

interface TriggerProps {
  children: (
    ref: (node: ReferenceType | null) => void,
    props: Record<string, unknown>
  ) => JSX.Element
}

export const Trigger = ({ children }: TriggerProps) => {
  const context = useMenuContext()
  const ref = context.refs.setReference

  const props: Record<string, unknown> = {
    "data-state": context.open ? "open" : "closed",
  }

  return (
    <ErrorBoundary>
      {children(ref, context.getReferenceProps(props))}
    </ErrorBoundary>
  )
}
