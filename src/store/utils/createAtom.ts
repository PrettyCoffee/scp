import { useMemo } from "react"

import { useAtom, atom, useSetAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const storePrefix = "todo-"

export const createAtom = <T>(
  scope: "global" | "workspace",
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
