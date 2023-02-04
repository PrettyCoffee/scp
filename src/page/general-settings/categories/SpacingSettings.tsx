import { NumberInput } from "~/components"
import { useGeneralStore } from "~/store"
import { GeneralStoreState } from "~/store/General"

import { InputGrid } from "../fragments"

export const SpacingSettings = () => {
  const { spacing, setStoreKey } = useGeneralStore()
  const { gridSize, headerGap, windowPadding, headerPadding, widgetGap } =
    spacing

  const createSpacingChange =
    (key: keyof GeneralStoreState["spacing"]) => (value: number) =>
      setStoreKey("spacing", spacing => ({ ...spacing, [key]: value }))

  return (
    <InputGrid columns={2}>
      <NumberInput
        label="Header padding"
        placeholder="8"
        unit="px"
        value={headerPadding}
        onChange={createSpacingChange("headerPadding")}
      />
      <NumberInput
        label="Window padding"
        placeholder="8"
        unit="px"
        value={windowPadding}
        onChange={createSpacingChange("windowPadding")}
      />
      <NumberInput
        label="Header/Widgets gap"
        placeholder="8"
        unit="px"
        value={headerGap}
        onChange={createSpacingChange("headerGap")}
      />
      <NumberInput
        label="Widget gap"
        placeholder="4"
        unit="px"
        value={widgetGap}
        onChange={createSpacingChange("widgetGap")}
      />
      <NumberInput
        label="Size of grid snapping"
        placeholder="32"
        unit="px"
        value={gridSize}
        onChange={createSpacingChange("gridSize")}
      />
    </InputGrid>
  )
}
