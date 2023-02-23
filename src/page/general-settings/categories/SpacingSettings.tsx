import { NumberInput } from "~/components"
import { useSpacing, GlobalSpacing } from "~/store"

import { InputGrid } from "../fragments"

export const SpacingSettings = () => {
  const spacing = useSpacing()

  const createSpacingChange = (key: keyof GlobalSpacing) => (value: number) =>
    spacing.set({
      ...spacing.value,
      [key]: value,
    })

  return (
    <InputGrid columns={2}>
      <NumberInput
        label="Header padding"
        placeholder="8"
        unit="px"
        value={spacing.value.headerPadding}
        onChange={createSpacingChange("headerPadding")}
      />
      <NumberInput
        label="Window padding"
        placeholder="8"
        unit="px"
        value={spacing.value.windowPadding}
        onChange={createSpacingChange("windowPadding")}
      />
      <NumberInput
        label="Header/Widgets gap"
        placeholder="8"
        unit="px"
        value={spacing.value.headerGap}
        onChange={createSpacingChange("headerGap")}
      />
      <NumberInput
        label="Widget gap"
        placeholder="4"
        unit="px"
        value={spacing.value.widgetGap}
        onChange={createSpacingChange("widgetGap")}
      />
      <NumberInput
        label="Size of grid snapping"
        placeholder="32"
        unit="px"
        value={spacing.value.gridSize}
        onChange={createSpacingChange("gridSize")}
      />
    </InputGrid>
  )
}
