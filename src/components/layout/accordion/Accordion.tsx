import { Children, Fragment, ReactElement, useState } from "react"

import * as Radix from "@radix-ui/react-accordion"

import { Separator } from "../../primitives"
import { AccordionItem, AccordionItemProps } from "./AccordionItem"

const Root = styled(Radix.Root)(
  ({ theme: { space } }) => css`
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
  `
)

export interface AccordionRootProps {
  children:
    | ReactElement<AccordionItemProps>
    | ReactElement<AccordionItemProps>[]
}

const getInitialOpen = (children: AccordionRootProps["children"]) =>
  Children.map(children, ({ props }) =>
    props.initialOpen ? props.label : null
  ).filter(value => !!value)

const AccordionRoot = ({ children }: AccordionRootProps) => {
  const elements = Array.isArray(children) ? children : [children]
  const [open, setOpen] = useState(getInitialOpen(children))

  return (
    <Root type="multiple" value={open} onValueChange={setOpen}>
      {elements.map(element => (
        <Fragment key={element.props.label}>
          {element}
          <Separator />
        </Fragment>
      ))}
    </Root>
  )
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
}
