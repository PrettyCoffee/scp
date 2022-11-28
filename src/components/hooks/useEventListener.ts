import { RefObject, useLayoutEffect } from "react"

import { useLatest } from "./useLatest"

type EventListener<T extends keyof WindowEventMap> = (
  event: WindowEventMap[T]
) => void

interface UseEventListenerArgs<T extends keyof WindowEventMap> {
  type: T
  listener: EventListener<T>
  ref?: RefObject<Element>
  disabled?: boolean
}

export const useEventListener = <T extends keyof WindowEventMap>({
  ref,
  listener,
  type,
  disabled,
}: UseEventListenerArgs<T>) => {
  const listenerRef = useLatest(listener)

  useLayoutEffect(() => {
    const element = ref?.current ?? window
    const handler = (event: Event) =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      listenerRef.current(event as WindowEventMap[T])

    if (!disabled) element.addEventListener(type, handler)
    else element.removeEventListener(type, handler)

    return () => element.removeEventListener(type, handler)
  }, [type, ref, disabled, listenerRef])
}
