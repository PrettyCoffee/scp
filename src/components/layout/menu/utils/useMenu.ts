import { useMemo, useState } from "react"

import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStatus,
} from "@floating-ui/react"

export interface MenuOptions {
  initialOpen?: boolean
}

export const useMenu = ({ initialOpen = false }: MenuOptions = {}) => {
  const [open, setOpen] = useState(initialOpen)

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  })

  const context = data.context

  const { isMounted, status } = useTransitionStatus(context)
  const click = useClick(context)
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" })
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      isMounted,
      status,
      ...interactions,
      ...data,
    }),
    [open, setOpen, isMounted, status, interactions, data]
  )
}
