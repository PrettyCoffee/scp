import { useState } from "react"

import { useTheme } from "@emotion/react"

import {
  Accordion,
  AccordionRootProps,
  AccordionState,
  Button,
  Collapse,
  Expand,
  IconButton,
  Menu,
  Settings,
  TextArea,
  Trash,
} from "../components"
import { NumberInput } from "../components/inputs/NumberInput"
import { useGeneralStore } from "../store"
import { BackgroundSettings } from "./BackgroundSettings"

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

const GeneralSettings = (
  props: Pick<AccordionRootProps, "open" | "onOpenChange">
) => (
  <Accordion.Root {...props}>
    <Accordion.Item label="Spacing">
      <SpacingEditor />
    </Accordion.Item>

    <Accordion.Item label="Background">
      <BackgroundSettings />
    </Accordion.Item>

    <Accordion.Item label="Custom CSS">
      <TileCssEditor />
    </Accordion.Item>
  </Accordion.Root>
)

const ExpandSettings = ({
  open,
  onOpenChange,
}: Pick<AccordionRootProps, "open" | "onOpenChange">) =>
  open === "none" ? (
    <IconButton
      caption="Expand all options"
      icon={Expand}
      look="compact"
      onClick={() => onOpenChange("all")}
    />
  ) : (
    <IconButton
      caption="Collapse all options"
      icon={Collapse}
      look="compact"
      onClick={() => onOpenChange("none")}
    />
  )

export const GeneralSettingsMenu = () => {
  const [open, setOpen] = useState<AccordionState>("all")

  return (
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
        <Menu.Header title="General Settings">
          <ExpandSettings open={open} onOpenChange={setOpen} />
        </Menu.Header>
        <GeneralSettings open={open} onOpenChange={setOpen} />
        <ResetButton />
      </Menu.Content>
    </Menu.Root>
  )
}
