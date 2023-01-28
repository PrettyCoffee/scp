import { useState } from "react"

import { Text } from "../primitives"
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

const Layout = styled.div(
  ({ theme: { space } }) => css`
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
    max-width: calc(${space["3xl"]} * 3);
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
    <Layout>
      {label && <Text.Small color="muted">{label}</Text.Small>}
      <Input
        valid={valid}
        applyShake={applyShake}
        onChange={({ target: { value } }) => handleChange(value)}
        onAnimationEnd={() => setApplyShake("off")}
        {...delegated}
      />
    </Layout>
  )
}
