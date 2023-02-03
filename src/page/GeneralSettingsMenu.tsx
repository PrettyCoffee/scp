import { useState } from "react"

import { useTheme } from "@emotion/react"

import {
  Accordion,
  AccordionState,
  Button,
  IconButton,
  Menu,
  Settings,
  TextArea,
  Trash,
} from "../components"
import { NumberInput } from "../components/inputs/NumberInput"
import { useGeneralStore } from "../store"

export const InputGrid = styled.div<{ columns?: number }>(
  ({ theme: { space }, columns = 2 }) => css`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    gap: ${space.md};
    > * {
      flex: 1;
    }
  `
)

const SpacingEditor = () => {
  const { gridSize, windowPadding, setStoreKey } = useGeneralStore()

  const setGridSize = (value: number) => setStoreKey("gridSize", value)
  const setWindowPadding = (value: number) =>
    setStoreKey("windowPadding", value)

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
    </InputGrid>
  )
}

const TileCssEditor = () => {
  const { globalTileCss, setStoreKey } = useGeneralStore()
  const setGlobalTileCss = (value: string) =>
    setStoreKey("globalTileCss", value)
  return (
    <TextArea
      value={globalTileCss}
      label="Global tile CSS"
      onChange={setGlobalTileCss}
      contentType="code"
    />
  )
}

const ResetButton = () => {
  const { resetStore } = useGeneralStore()
  const { space } = useTheme()
  return (
    <div style={{ paddingLeft: space.md, paddingTop: space.sm }}>
      <Button
        look="danger"
        icon={Trash}
        caption="Reset settings"
        onClick={resetStore}
      />
    </div>
  )
}

const GeneralSettings = () => {
  const [open, setOpen] = useState<AccordionState>("all")

  return (
    <Accordion.Root open={open} onOpenChange={setOpen}>
      <Accordion.Item label="Spacing">
        <SpacingEditor />
      </Accordion.Item>

      <Accordion.Item label="Custom CSS">
        <TileCssEditor />
      </Accordion.Item>
    </Accordion.Root>
  )
}

export const GeneralSettingsMenu = () => (
  <Menu.Root initialOpen>
    <Menu.Trigger>
      {(ref, props) => (
        <IconButton
          setRef={ref}
          {...props}
          icon={Settings}
          caption="Open settings"
          look="compact"
        />
      )}
    </Menu.Trigger>
    <Menu.Content>
      <Menu.Header title="General Settings" />
      <GeneralSettings />
      <ResetButton />
    </Menu.Content>
  </Menu.Root>
)
