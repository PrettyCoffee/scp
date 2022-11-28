import { useCallback, useEffect, useRef } from "react"

import { useLatest } from "./useLatest"

export const useThrottle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null)
  const lastArgs = useRef<T | null>(null)

  const invoke = useLatest(() => {
    timeoutId.current = null
    const args = lastArgs.current
    if (args != null) callback(...args)
  })

  useEffect(
    () => () => {
      if (timeoutId.current != null) clearTimeout(timeoutId.current)
    },
    []
  )

  return useCallback(
    (...args: T) => {
      lastArgs.current = args
      if (timeoutId.current === null) {
        timeoutId.current = setTimeout(invoke.current, delay)
      }
    },
    [delay, invoke]
  )
}
