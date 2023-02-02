import { useEffect, useState } from "react"

import { useLatest } from "../hooks"
import { TextInput, TextInputProps } from "./TextInput"

const validate = (value: string) => !Number.isNaN(Number(value))

export interface NumberInputProps
  extends Pick<TextInputProps, "label" | "placeholder" | "unit"> {
  value: number
  onChange: (value: number) => void
}

export const NumberInput = ({
  value,
  onChange,
  ...delegated
}: NumberInputProps) => {
  const [internal, setInternal] = useState(String(value))
  const onChangeRef = useLatest(onChange)

  useEffect(() => {
    onChangeRef.current(Number(internal))
  }, [internal, onChangeRef])

  return (
    <TextInput
      {...delegated}
      value={internal}
      onChange={setInternal}
      validate={validate}
    />
  )
}
