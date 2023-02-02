import { useState } from "react"

import { fontStyles, Text } from "../primitives"
import { InputBorder, ShakeState } from "./fragments/InputBorder"
import { InputLabel } from "./fragments/InputLabel"

const UnitText = styled(Text.Medium)(
  ({ theme: { space } }) => css`
    padding-right: ${space.sm};
  `
)

const Input = styled.input(
  ({ theme, theme: { space } }) => css`
    ${fontStyles({ theme })}
    padding: 0 ${space.sm};
    background-color: transparent;
    border: none;
    flex: 1 1 0;
    height: 100%;
    width: 100%;
  `
)

export interface TextInputProps {
  value: string
  onChange: (value: string) => void
  validate?: (value: string) => boolean
  label?: string
  placeholder?: string
  unit?: string
}

export const TextInput = ({
  onChange,
  validate,
  label,
  unit,
  ...delegated
}: TextInputProps) => {
  const [valid, setValid] = useState(true)
  const [applyShake, setApplyShake] = useState<ShakeState>("initial")

  const handleChange = (value: string) => {
    const valid = !validate ? true : validate(value)
    if (valid) {
      onChange(value)
      setValid(true)
    } else {
      setValid(false)
      setApplyShake("on")
    }
  }

  return (
    <InputLabel label={label}>
      <InputBorder
        valid={valid}
        applyShake={applyShake}
        onAnimationEnd={() => setApplyShake("off")}
      >
        <Input
          onChange={({ target: { value } }) => handleChange(value)}
          onBlur={() => setValid(true)}
          {...delegated}
        />
        {unit && (
          <UnitText color="muted" display="block">
            {unit}
          </UnitText>
        )}
      </InputBorder>
    </InputLabel>
  )
}
