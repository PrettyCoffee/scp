import { useEffect, useMemo } from "react"

import { useAtom, atom, useSetAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const storePrefix = "todo-"

const calls: Record<string, number | undefined> = {}

export const createAtom = <T>(
  scope: "global",
  name: string,
  initialValue: T
) => {
  const key = `${scope}:${name}`
  const storeAtom = atomWithStorage(storePrefix + key, initialValue)
  storeAtom.debugLabel = key

  const resetAtom = atom(null, (_, set) => set(storeAtom, initialValue))
  resetAtom.debugLabel = `${key}:reset`

  const useResettableAtom = () => {
    const [value, set] = useAtom(storeAtom)
    const reset = useSetAtom(resetAtom)

    useEffect(() => {
      calls[name] = (calls[name] ?? 0) + 1
      console.log(calls)
    }, [value, set, reset])

    return useMemo(
      () => ({
        value,
        set,
        reset,
      }),
      [value, set, reset]
    )
  }

  return [storeAtom, useResettableAtom] as const
}
