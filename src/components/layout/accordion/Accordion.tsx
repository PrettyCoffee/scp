import { Children, Fragment, ReactElement, useEffect, useRef } from "react"

import * as Radix from "@radix-ui/react-accordion"

import { AccordionItem, AccordionItemProps } from "./AccordionItem"
import { Separator } from "../../primitives"
import { ErrorBoundary } from "../../utility"

type AccordionChild = ReactElement<AccordionItemProps>

const childrenToArray = (children: AccordionChild | AccordionChild[]) =>
  Array.isArray(children) ? children : [children]

const getItemProps = (children: AccordionChild[]) =>
  children.map(({ props }) => props)

const getAllLabels = (children: AccordionChild[]) =>
  getItemProps(children).map(({ label }) => label)

const getInitialOpen = (children: AccordionChild[]) =>
  getItemProps(children).reduce<string[]>(
    (result, { initialOpen, label }) =>
      initialOpen ? [...result, label] : result,
    []
  )

const convertState = (
  open: string[],
  children: AccordionChild[]
): AccordionState => {
  const elements = Children.toArray(children)
  const opened = open.length
  const items = elements.length

  return opened === 0 ? "none" : opened === items ? "all" : open
}

const useInitialOpen = ({
  elements,
  onOpenChange,
}: Pick<AccordionRootProps, "onOpenChange"> & {
  elements: AccordionChild[]
}) => {
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      const initialOpen = getInitialOpen(elements)
      onOpenChange(convertState(initialOpen, elements))
      initialRender.current = false
    }
  }, [elements, onOpenChange])
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
  children: AccordionChild | AccordionChild[]
}

const AccordionRoot = ({
  children,
  open,
  onOpenChange,
}: AccordionRootProps) => {
  const elements = childrenToArray(children)

  useInitialOpen({ elements, onOpenChange })

  const handleChange = (value: string[]) =>
    onOpenChange(convertState(value, elements))

  const openState =
    open === "all" ? getAllLabels(elements) : open === "none" ? [] : open

  return (
    <ErrorBoundary>
      <Root type="multiple" value={openState} onValueChange={handleChange}>
        {elements.map(element => (
          <Fragment key={element.props.label}>
            {element}
            <Separator />
          </Fragment>
        ))}
      </Root>
    </ErrorBoundary>
  )
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
}
