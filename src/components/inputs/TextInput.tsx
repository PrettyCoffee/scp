import { useState } from "react"

import { InputLabel } from "./fragments/InputLabel"
import { inputStyles } from "./utils/inputStyles"

const shakeOn = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(-1px, 1px);
  }
`

const shakeOff = keyframes`
  0% {
    transform: translate(-1px, 1px);
  }
  50% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0, 0);
  }
`

type ShakeState = "initial" | "on" | "off"

const Input = styled.input<{
  applyShake: ShakeState
  valid: boolean
}>(
  ({ theme, theme: { space }, applyShake, valid }) => css`
    ${inputStyles({ theme, valid })}

    height: ${space.lg};
    padding: 0 ${space.sm};

    animation-name: ${applyShake === "on"
      ? shakeOn
      : applyShake === "off"
      ? shakeOff
      : ""};
    animation-duration: 0.1s;
    animation-timing-function: ease-in-out;
  `
)

export interface TextInputProps {
  value: string
  onChange: (value: string) => void
  validate?: (value: string) => boolean
  label?: string
  placeholder?: string
}

export const TextInput = ({
  onChange,
  validate,
  label,
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
      <Input
        valid={valid}
        applyShake={applyShake}
        onChange={({ target: { value } }) => handleChange(value)}
        onAnimationEnd={() => setApplyShake("off")}
        onBlur={() => setValid(true)}
        {...delegated}
      />
    </InputLabel>
  )
}
