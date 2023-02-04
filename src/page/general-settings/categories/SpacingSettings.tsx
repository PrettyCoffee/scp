import { NumberInput } from "~/components"
import { useGeneralStore } from "~/store"
import { GeneralStoreState } from "~/store/General"

import { InputGrid } from "../fragments"

export const SpacingSettings = () => {
  const { spacing, setStoreKey } = useGeneralStore()
  const { gridSize, headerGap, windowPadding } = spacing

  const createSpacingChange =
    (key: keyof GeneralStoreState["spacing"]) => (value: number) =>
      setStoreKey("spacing", spacing => ({ ...spacing, [key]: value }))

  return (
    <InputGrid columns={2}>
      <NumberInput
        label="Size of grid snapping"
        placeholder="32"
        unit="px"
        value={gridSize}
        onChange={createSpacingChange("gridSize")}
      />
      <NumberInput
        label="Window padding"
        placeholder="8"
        unit="px"
        value={windowPadding}
        onChange={createSpacingChange("windowPadding")}
      />
      <NumberInput
        label="Header gap (to widgets)"
        placeholder="8"
        unit="px"
        value={headerGap}
        onChange={createSpacingChange("headerGap")}
      />
    </InputGrid>
  )
}
