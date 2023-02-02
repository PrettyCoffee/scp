import { Check, fontStyles, Icon } from "../../../primitives"
import { inputBorder } from "../../utils/inputBorder"
import { SelectOption as SelectOptionType, useSelectContext } from "../Select"

const Option = styled.div(
  ({ theme, theme: { border, space, tokens } }) => css`
    ${fontStyles({ theme, color: "default" })}
    ${inputBorder({ theme, color: "none" })}

    height: ${space.lg};
    min-height: ${space.lg};
    padding: 0 ${space.sm};

    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &[data-selected="true"] {
      ${fontStyles({ theme, color: "active" })}
    }

    &:focus-visible {
      outline: ${border} ${tokens.accent};
      outline-offset: calc(-1 * ${space["3xs"]});
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

interface SelectOptionProps extends SelectOptionType {
  index: number
}

export const SelectOption = ({ index, value, label }: SelectOptionProps) => {
  const { getOptionProps, selectedOption } = useSelectContext()

  return (
    <Option key={value} {...getOptionProps(index)}>
      {label ?? value}
      {selectedOption.value === value && <Icon icon={Check} />}
    </Option>
  )
}
