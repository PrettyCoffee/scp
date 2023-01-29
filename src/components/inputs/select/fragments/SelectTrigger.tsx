import { fontStyles, Icon, Chevron, Text } from "../../../primitives"
import { InputLabel } from "../../fragments/InputLabel"
import { inputBorder } from "../../utils/inputBorder"
import { SelectProps, useSelectContext } from "../Select"

const Trigger = styled.button(
  ({ theme, theme: { border, space, tokens } }) => css`
    ${fontStyles({ theme, color: "default" })}
    ${inputBorder({ theme, color: "none" })}
    
    height: ${space.lg};
    width: 100%;

    min-height: ${space.lg};
    padding: 0 ${space.sm};

    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: ${space.sm};

    cursor: pointer;

    &[data-placeholder] {
      color: ${tokens.text.muted};
    }

    background-color: ${tokens.background.input};
    &:focus-visible {
      outline: ${border} ${tokens.accent};
    }

    &:hover,
    &:focus-visible {
      background-color: ${tokens.background.hover};
    }
    &:active {
      background-color: ${tokens.background.press};
    }
  `
)

type SelectTriggerProps = Pick<SelectProps, "placeholder" | "label">

export const SelectTrigger = ({
  placeholder = "Select option",
  ...labelProps
}: SelectTriggerProps) => {
  const { triggerProps, selectedOption } = useSelectContext()
  const currentLabel = selectedOption?.label ?? selectedOption?.value ?? null

  return (
    <InputLabel {...labelProps}>
      <Trigger {...triggerProps}>
        <Text.Medium color={currentLabel ? "default" : "muted"}>
          {currentLabel ?? placeholder}
        </Text.Medium>
        <Icon icon={Chevron.Down} />
      </Trigger>
    </InputLabel>
  )
}
