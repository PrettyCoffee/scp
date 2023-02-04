import { TextArea } from "~/components"
import { useGeneralStore } from "~/store"

import { InputGrid } from "./fragments"

export const CustomCssSettings = () => {
  const { globalTileCss, headerCss, globalCss, setStoreKey } = useGeneralStore()
  const setGlobalTileCss = (value: string) =>
    setStoreKey("globalTileCss", value)
  const setHeaderCss = (value: string) => setStoreKey("headerCss", value)
  const setGlobalCss = (value: string) => setStoreKey("globalCss", value)

  return (
    <InputGrid columns={1}>
      <TextArea
        value={globalCss}
        label="Global CSS"
        onChange={setGlobalCss}
        contentType="code"
      />
      <TextArea
        value={headerCss}
        label="Header CSS"
        onChange={setHeaderCss}
        contentType="code"
      />
      <TextArea
        value={globalTileCss}
        label="Global tile CSS"
        onChange={setGlobalTileCss}
        contentType="code"
      />
    </InputGrid>
  )
}
