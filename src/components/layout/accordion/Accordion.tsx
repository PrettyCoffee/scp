import { Children, Fragment, ReactElement, useState } from "react"

import * as Radix from "@radix-ui/react-accordion"

import { Separator } from "../../primitives"
import { AccordionItem, AccordionItemProps } from "./AccordionItem"

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
    <Radix.Root type="multiple" value={open} onValueChange={setOpen}>
      {elements.map((element, index) => (
        <Fragment key={element.props.label}>
          {index > 0 && <Separator />}
          {element}
        </Fragment>
      ))}
    </Radix.Root>
  )
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
}
