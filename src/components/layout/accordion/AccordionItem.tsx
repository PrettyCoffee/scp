import { PropsWithChildren } from "react"

import * as Radix from "@radix-ui/react-accordion"
import Color from "color"

import { Icon, Chevron, Text } from "../../primitives"
import { ErrorBoundary } from "../../utility"

const Header = styled(Radix.Header)`
  display: block;
  margin: 0;
`

const Trigger = styled(Radix.Trigger)(
  ({ theme: { space, tokens, border, raw } }) => css`
    width: 100%;
    height: ${space.xl};
    padding: 0 ${space.md};
    border: none;
    border-radius: ${space.sm};

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    background-color: transparent;
    :hover,
    :focus-visible {
      background-color: ${Color(raw.tokens.text.default).alpha(0.1).string()};
    }
    :active {
      background-color: ${Color(raw.tokens.text.default).alpha(0.2).string()};
    }
    :focus-visible {
      outline: ${border} ${tokens.accent};
    }

    svg {
      color: ${tokens.text.default};
    }
    &[data-state="closed"] svg {
      transform: rotate(180deg);
    }
  `
)

const Content = styled(Radix.Content)(
  ({ theme: { space } }) => css`
    overflow: hidden;

    padding: ${space.md};

    &[data-state="closed"] {
      padding: 0;
    }
  `
)

export interface AccordionItemProps {
  label: string
  initialOpen?: boolean
}

export const AccordionItem = ({
  children,
  label,
}: PropsWithChildren<AccordionItemProps>) => (
  <ErrorBoundary>
    <Radix.Item value={label}>
      <Header>
        <Trigger>
          <Text.Large>{label}</Text.Large>
          <Icon size="lg" icon={Chevron.Down} />
        </Trigger>
      </Header>
      <Content>{children}</Content>
    </Radix.Item>
  </ErrorBoundary>
)
