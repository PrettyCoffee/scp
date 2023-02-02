import { createContext, useContext } from "react"

import { FloatingPortal } from "@floating-ui/react"

import { InputLabelProps } from "../fragments/InputLabel"
import { SelectContent } from "./fragments/SelectContent"
import { SelectTrigger } from "./fragments/SelectTrigger"
import { useSelect } from "./useSelect"

type SelectContextState = ReturnType<typeof useSelect>
const SelectContext = createContext<SelectContextState | null>(null)
export const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (!context)
    throw new Error("useSelectContext can only be used inside a Select")

  return context
}

export interface SelectOption<T extends string = string> {
  value: T
  label?: string
}

export interface SelectProps<T extends string = string>
  extends InputLabelProps {
  value: T
  options: SelectOption<T>[]
  placeholder?: string
  onChange: (value: T) => void
}

export const Select = <T extends string>({
  options,
  placeholder,
  onChange,
  value,
  ...labelProps
}: SelectProps<T>) => {
  const selectState = useSelect({ value, options, onChange })

  return (
    <SelectContext.Provider value={selectState}>
      <SelectTrigger placeholder={placeholder} {...labelProps} />
      <FloatingPortal>
        <SelectContent options={options} />
      </FloatingPortal>
    </SelectContext.Provider>
  )
}
