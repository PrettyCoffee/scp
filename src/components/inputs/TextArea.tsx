import { useState } from "react"

import { InputLabel } from "./fragments/InputLabel"
import { InputStyleProps, inputStyles } from "./utils/inputStyles"
import { ErrorBoundary } from "../utility"

const Area = styled.textarea<InputStyleProps>(
  ({ theme, theme: { space }, valid, contentType }) => css`
    ${inputStyles({ theme, valid, contentType })}

    height: calc(${space["3xl"]} * 4);
    resize: vertical;
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
    <ErrorBoundary>
      <InputLabel label={label} display="block">
        <Area
          valid={valid}
          onChange={({ target: { value } }) => handleChange(value)}
          {...delegated}
        />
      </InputLabel>
    </ErrorBoundary>
  )
}
