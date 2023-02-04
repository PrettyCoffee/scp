import { TextArea } from "~/components"
import { useGeneralStore } from "~/store"
import { GeneralStoreState } from "~/store/General"

import { InputGrid } from "../fragments"

export const CustomCssSettings = () => {
  const { customCss, setStoreKey } = useGeneralStore()

  const createCssChange =
    (key: keyof GeneralStoreState["customCss"]) => (value: string) =>
      setStoreKey("customCss", customCss => ({ ...customCss, [key]: value }))

  return (
    <InputGrid columns={1}>
      <TextArea
        value={customCss.global}
        label="Global CSS"
        onChange={createCssChange("global")}
        contentType="code"
      />
      <TextArea
        value={customCss.header}
        label="Header CSS"
        onChange={createCssChange("header")}
        contentType="code"
      />
      <TextArea
        value={customCss.tile}
        label="Global tile CSS"
        onChange={createCssChange("tile")}
        contentType="code"
      />
    </InputGrid>
  )
}
