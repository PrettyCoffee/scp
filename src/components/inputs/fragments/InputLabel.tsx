import { PropsWithChildren } from "react"

import { Text } from "../../primitives"

interface LayoutProps {
  display?: "block" | "inline"
}

const Label = styled.label<LayoutProps>(
  ({ theme: { space }, display = "inline" }) => css`
    display: ${display === "block" ? "flex" : "inline-flex"};
    flex-direction: column;
    gap: ${space.xs};
    width: 100%;

    ${display === "inline" &&
    css`
      max-width: calc(${space["3xl"]} * 3);
    `}
  `
)

export interface InputLabelProps {
  label?: string
}

export const InputLabel = ({
  children,
  label,
  display,
}: PropsWithChildren<InputLabelProps & LayoutProps>) =>
  !label ? (
    <Label as="div" display={display}>
      {children}
    </Label>
  ) : (
    <Label display={display}>
      <Text.Small color="muted" noWrap ellipsis>
        {label}
      </Text.Small>
      {children}
    </Label>
  )
