import { TextArea } from "~/components"
import { useCustomCss, GlobalCustomCss } from "~/store"

import { InputGrid } from "../fragments"

export const CustomCssSettings = () => {
  const customCss = useCustomCss()

  const createCssChange = (key: keyof GlobalCustomCss) => (value: string) =>
    customCss.set({
      ...customCss.value,
      [key]: value,
    })

  return (
    <InputGrid columns={1}>
      <TextArea
        value={customCss.value.global}
        label="Global CSS"
        onChange={createCssChange("global")}
        contentType="code"
      />
      <TextArea
        value={customCss.value.header}
        label="Header CSS"
        onChange={createCssChange("header")}
        contentType="code"
      />
      <TextArea
        value={customCss.value.tile}
        label="Global tile CSS"
        onChange={createCssChange("tile")}
        contentType="code"
      />
    </InputGrid>
  )
}
