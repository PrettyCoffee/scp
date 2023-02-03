import { Children, Fragment, ReactElement, useEffect, useRef } from "react"

import * as Radix from "@radix-ui/react-accordion"

import { Separator } from "../../primitives"
import { AccordionItem, AccordionItemProps } from "./AccordionItem"

const getItemProps = (children: AccordionRootProps["children"]) =>
  Children.map(children, ({ props }) => props)

const getAllLabels = (children: AccordionRootProps["children"]) =>
  getItemProps(children).map(({ label }) => label)

const getInitialOpen = (children: AccordionRootProps["children"]) =>
  getItemProps(children).reduce<string[]>(
    (result, { initialOpen, label }) =>
      initialOpen ? [...result, label] : result,
    []
  )

const useInitialOpen = ({
  children,
  onOpenChange,
}: Pick<AccordionRootProps, "children" | "onOpenChange">) => {
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      const initialOpen = getInitialOpen(children)
      onOpenChange(initialOpen)
      initialRender.current = false
    }
  }, [children, onOpenChange])
}

const Root = styled(Radix.Root)(
  ({ theme: { space } }) => css`
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
  `
)

export type AccordionState = string[] | "all" | "none"

export interface AccordionRootProps {
  open: AccordionState
  onOpenChange: (open: AccordionState) => void
  children:
    | ReactElement<AccordionItemProps>
    | ReactElement<AccordionItemProps>[]
}

const AccordionRoot = ({
  children,
  open,
  onOpenChange,
}: AccordionRootProps) => {
  const elements = Array.isArray(children) ? children : [children]

  useInitialOpen({ children, onOpenChange })

  const handleChange = (value: string[]) => {
    const opened = value.length
    const items = elements.length
    const newValue = opened === 0 ? "none" : opened === items ? "all" : value
    onOpenChange(newValue)
  }

  const openState =
    open === "all" ? getAllLabels(children) : open === "none" ? [] : open

  return (
    <Root type="multiple" value={openState} onValueChange={handleChange}>
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
