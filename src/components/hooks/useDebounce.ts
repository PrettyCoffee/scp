import { useCallback, useEffect, useRef } from "react"

import { useLatest } from "./useLatest"

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  const timeoutId = useRef<NodeJS.Timeout>()
  const lastArgs = useRef<T | null>(null)

  const invoke = useLatest(() => {
    const args = lastArgs.current
    if (args != null) callback(...args)
  })

  const clearTimer = useCallback(() => {
    if (timeoutId.current != null) clearTimeout(timeoutId.current)
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    timeoutId.current = setTimeout(invoke.current, delay)
  }, [clearTimer, delay, invoke])

  useEffect(() => clearTimer, [clearTimer])

  return useCallback(
    (...args: T) => {
      lastArgs.current = args
      startTimer()
    },
    [startTimer]
  )
}
