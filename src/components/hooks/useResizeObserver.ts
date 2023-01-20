import { RefObject, useEffect, useRef, useState } from "react"

import { Measurement } from "../base"

export const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [measurements, setMeasurements] = useState<Measurement>({
    height: 0,
    width: 0,
  })

  const observer = useRef(
    new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setMeasurements({ width, height })
    })
  )

  useEffect(() => {
    const resizer = observer.current
    const element = ref.current
    if (!element) return

    resizer.observe(element)
    return () => resizer.disconnect()
  }, [ref])

  return measurements
}
