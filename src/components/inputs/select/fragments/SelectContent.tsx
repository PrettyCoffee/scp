import { FloatingFocusManager } from "@floating-ui/react"

import { scrollFocus } from "../../../base"
import { Select_Z_INDEX } from "../../../base/z-index"
import { inputBorder } from "../../utils/inputBorder"
import { useSelectContext } from "../Select"
import { SelectOption } from "./SelectOption"

const StyledContent = styled.div(
  ({ theme, theme: { tokens, shadow, space } }) => css`
    ${inputBorder({ theme, color: "none" })}
    ${scrollFocus({ theme })}
    
    background-color: ${tokens.background.input};
    z-index: ${Select_Z_INDEX};
    box-shadow: ${shadow.medium};
    width: var(--radix-select-trigger-width);
    position: absolute;
    top: ${space.xxs};
    overflow-y: auto;
  `
)

export interface SelectOption {
  value: string
  label?: string
}
interface SelectContentProps {
  options: SelectOption[]
}

export const SelectContent = ({ options }: SelectContentProps) => {
  const { open, context, floatingProps } = useSelectContext()

  return !open ? null : (
    <FloatingFocusManager context={context} modal={false}>
      <StyledContent {...floatingProps}>
        {options.map((option, index) => (
          <SelectOption key={option.value} index={index} {...option} />
        ))}
      </StyledContent>
    </FloatingFocusManager>
  )
}
