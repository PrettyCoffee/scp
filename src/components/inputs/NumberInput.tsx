import { useEffect, useRef, useState } from "react"

import { TextInput, TextInputProps } from "./TextInput"
import { useLatest } from "../hooks"
import { ErrorBoundary } from "../utility"

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
  const wasInternalChange = useRef(false)
  const onChangeRef = useLatest(onChange)

  useEffect(() => {
    onChangeRef.current(Number(internal))
    wasInternalChange.current = true
  }, [internal, onChangeRef])

  useEffect(() => {
    if (wasInternalChange.current) {
      wasInternalChange.current = false
      return
    }
    setInternal(String(value))
  }, [value])

  return (
    <ErrorBoundary>
      <TextInput
        {...delegated}
        value={internal}
        onChange={setInternal}
        validate={validate}
      />
    </ErrorBoundary>
  )
}
