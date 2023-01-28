import { useState } from "react"

import { Text } from "../primitives"
import { InputStyleProps, inputStyles } from "./utils/inputStyles"

const Area = styled.textarea<InputStyleProps>(
  ({ theme, theme: { space }, valid, contentType }) => css`
    ${inputStyles({ theme, valid, contentType })}

    height: calc(${space["3xl"]} * 4);
    resize: vertical;
  `
)

const Layout = styled.div(
  ({ theme: { space } }) => css`
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
    width: 100%;
  `
)

export interface TextAreaProps extends Pick<InputStyleProps, "contentType"> {
  value: string
  onChange: (value: string) => void
  validate?: (value: string) => boolean
  label?: string
  placeholder?: string
}

export const TextArea = ({
  onChange,
  validate,
  label,
  ...delegated
}: TextAreaProps) => {
  const [valid, setValid] = useState(true)

  const handleChange = (value: string) => {
    onChange(value)
    const valid = !validate ? true : validate(value)
    setValid(valid)
  }

  return (
    <Layout>
      {label && <Text.Small color="muted">{label}</Text.Small>}
      <Area
        valid={valid}
        onChange={({ target: { value } }) => handleChange(value)}
        {...delegated}
      />
    </Layout>
  )
}
