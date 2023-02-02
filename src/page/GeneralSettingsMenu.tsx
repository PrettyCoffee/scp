import {
  Button,
  IconButton,
  Menu,
  Settings,
  Text,
  TextArea,
  Trash,
} from "../components"
import { NumberInput } from "../components/inputs/NumberInput"
import { useGeneralStore } from "../store"

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
  return (
    <Button
      look="danger"
      icon={Trash}
      caption="Reset settings"
      onClick={resetStore}
    />
  )
}

const GeneralSettings = () => {
  const { gridSize, windowPadding, setStoreKey } = useGeneralStore()

  const setGridSize = (value: number) => setStoreKey("gridSize", value)
  const setWindowPadding = (value: number) =>
    setStoreKey("windowPadding", value)
  return (
    <>
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
      <TileCssEditor />
    </>
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
      <Menu.Header title="Settings" />
      <Text.Medium>General settings that affect the global design.</Text.Medium>
      <GeneralSettings />
      <div>
        <ResetButton />
      </div>
    </Menu.Content>
  </Menu.Root>
)
