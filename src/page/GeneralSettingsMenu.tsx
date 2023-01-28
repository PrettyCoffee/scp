import {
  Button,
  IconButton,
  Menu,
  Settings,
  Text,
  TextArea,
  Trash,
} from "../components"
import { TextInput } from "../components/inputs/TextInput"
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

  const setGridSize = (value: string) => setStoreKey("gridSize", Number(value))
  const setWindowPadding = (value: string) =>
    setStoreKey("windowPadding", Number(value))
  return (
    <>
      <TextInput
        label="Size of grid snapping"
        placeholder="Number value"
        value={String(gridSize)}
        onChange={setGridSize}
        validate={value => /(\d*)/.exec(value)?.[0] === value}
      />
      <TextInput
        label="Window padding"
        placeholder="Number value"
        value={String(windowPadding)}
        onChange={setWindowPadding}
        validate={value => /(\d*)/.exec(value)?.[0] === value}
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
