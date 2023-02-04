import { NumberInput } from "~/components"
import { useGeneralStore } from "~/store"

import { InputGrid } from "../fragments"

export const SpacingSettings = () => {
  const { gridSize, windowPadding, headerGap, setStoreKey } = useGeneralStore()

  const setGridSize = (value: number) => setStoreKey("gridSize", value)
  const setWindowPadding = (value: number) =>
    setStoreKey("windowPadding", value)
  const setHeaderGap = (value: number) => setStoreKey("headerGap", value)

  return (
    <InputGrid columns={2}>
      <NumberInput
        label="Size of grid snapping"
        placeholder="32"
        unit="px"
        value={gridSize}
        onChange={setGridSize}
      />
      <NumberInput
        label="Window padding"
        placeholder="8"
        unit="px"
        value={windowPadding}
        onChange={setWindowPadding}
      />
      <NumberInput
        label="Header gap (to widgets)"
        placeholder="8"
        unit="px"
        value={headerGap}
        onChange={setHeaderGap}
      />
    </InputGrid>
  )
}
