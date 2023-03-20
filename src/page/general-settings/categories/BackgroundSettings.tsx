import { useEffect } from "react"

import {
  Select,
  SelectOption,
  TextArea,
  TextInput,
  Text,
  Link,
  NumberInput,
} from "~/components"
import { Background, useBackground } from "~/store"

import { custom, image, pattern, solid } from "./defaultBackground"
import { InputGrid } from "../fragments"

const defaults = {
  custom,
  image,
  pattern,
  solid,
}

const castBgType = <T extends Background["type"]>(
  type: T,
  bg: Record<string, string | number>
) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- It is taking care that it has this type but I can't convince typescript that it is
  return (bg.type === type ? bg : defaults[type]) as Background<T>
}

const useBackgroundSettings = <T extends Background["type"]>(type: T) => {
  const background = useBackground()
  const value = castBgType(type, background.value)

  useEffect(() => {
    if (value !== background.value) background.set(value)
  }, [background, type, value])

  const createOnChange =
    <K extends keyof Background<T>>(key: K) =>
    (value: Background<T>[K]) =>
      background.set(previous => ({ ...previous, [key]: value }))

  return { background: value, createOnChange }
}

interface InputProps<T extends string | number> {
  value: T
  onChange: (value: T) => void
}

const BaseBackground = ({ value, onChange }: InputProps<string>) => (
  <TextInput
    label="Background base color"
    value={value}
    onChange={onChange}
    placeholder="hsl(240, 21%, 15%)"
  />
)

const Opacity = ({ value, onChange }: InputProps<number>) => (
  <NumberInput
    label="Opacity"
    value={value}
    onChange={onChange}
    placeholder="25"
    unit="%"
  />
)

const SolidBackground = () => {
  const { background, createOnChange } = useBackgroundSettings("solid")
  return (
    <BaseBackground value={background.base} onChange={createOnChange("base")} />
  )
}

const ImageBackground = () => {
  const { background, createOnChange } = useBackgroundSettings("image")
  return (
    <InputGrid columns={2}>
      <BaseBackground
        value={background.base}
        onChange={createOnChange("base")}
      />
      <TextInput
        label="Image link"
        value={background.src}
        onChange={createOnChange("src")}
        placeholder="https://my.image.link"
      />
      <Opacity
        value={background.opacity}
        onChange={createOnChange("opacity")}
      />
      <TextInput
        label="Filter list"
        value={background.filter}
        onChange={createOnChange("filter")}
        placeholder="blur(4px) grayscale(100%)"
      />
    </InputGrid>
  )
}

const PatternBackground = () => {
  const { background, createOnChange } = useBackgroundSettings("pattern")
  return (
    <>
      <InputGrid>
        <BaseBackground
          value={background.base}
          onChange={createOnChange("base")}
        />
        <TextInput
          label="Path"
          value={background.path}
          onChange={createOnChange("path")}
          placeholder="M ... z"
        />
        <TextInput
          label="Path color"
          value={background.pathColor}
          onChange={createOnChange("pathColor")}
          placeholder="hsl(217, 92%, 76%)"
        />
        <span />
        <NumberInput
          label="Width"
          value={background.width}
          unit="px"
          onChange={createOnChange("width")}
          placeholder="60"
        />
        <NumberInput
          label="Height"
          value={background.height}
          unit="px"
          onChange={createOnChange("height")}
          placeholder="96"
        />
        <Opacity
          value={background.opacity}
          onChange={createOnChange("opacity")}
        />
        <NumberInput
          label="Scale"
          value={background.scale}
          onChange={createOnChange("scale")}
          placeholder="100"
          unit="%"
        />
      </InputGrid>
      <span>
        <Text.Small weight="bold">Note:</Text.Small>
        <Text.Small> Have a look at </Text.Small>
        <Link size="small" href="https://heropatterns.com/" target="_blank">
          heropatterns.com
        </Link>
        <Text.Small> for more examples.</Text.Small>
        <br />
        <Text.Small>
          You will have to copy the path from the pattern and adapt the
          height/width accordingly. Only single paths are supported, for
          multiple paths, use a custom background.
        </Text.Small>
      </span>
    </>
  )
}

const CustomBackground = () => {
  const { background, createOnChange } = useBackgroundSettings("custom")
  return (
    <>
      <BaseBackground
        value={background.base}
        onChange={createOnChange("base")}
      />
      <TextArea
        label="Background css"
        contentType="code"
        placeholder="background-color: hsl(240, 21%, 15%);"
        value={background.css}
        onChange={createOnChange("css")}
      />
    </>
  )
}

const backgroundOptions: SelectOption<Background["type"]>[] = [
  { label: "Solid", value: "solid" },
  { label: "Image", value: "image" },
  { label: "Pattern", value: "pattern" },
  { label: "Custom", value: "custom" },
]

const Layout = styled.div(
  ({ theme: { space } }) => css`
    display: flex;
    flex-direction: column;
    gap: ${space.md};
  `
)

export const BackgroundSettings = () => {
  const background = useBackground()

  const type = background.value.type
  const setType = (type: Background["type"]) => background.set(defaults[type])

  return (
    <Layout>
      <InputGrid>
        <Select<Background["type"]>
          value={type}
          onChange={setType}
          label="Type"
          placeholder="Select background"
          options={backgroundOptions}
        />
      </InputGrid>
      {type === "solid" && <SolidBackground />}
      {type === "image" && <ImageBackground />}
      {type === "pattern" && <PatternBackground />}
      {type === "custom" && <CustomBackground />}
    </Layout>
  )
}
