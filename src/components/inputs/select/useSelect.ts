import { useRef, useState, MutableRefObject, KeyboardEvent } from "react"

import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useInteractions,
  offset,
  flip,
  size,
  autoUpdate,
  UseFloatingReturn,
} from "@floating-ui/react"

import { spacing } from "~/theme"

import { SelectOption, SelectProps } from "./Select"

type FloatingProps = UseFloatingReturn

interface SelectInteractionsProps extends Pick<FloatingProps, "context"> {
  selectedIndex: number
  setSelectedIndex: (value: number) => void
  options: SelectOption[]
  optionNodes: MutableRefObject<(HTMLElement | null)[]>
}

const useSelectInteractions = ({
  context,
  options,
  optionNodes,
  selectedIndex,
  setSelectedIndex,
}: SelectInteractionsProps) => {
  const [focusIndex, setFocusIndex] = useState<number | null>(null)

  const click = useClick(context, { event: "mousedown" })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "listbox" })
  const listNav = useListNavigation(context, {
    listRef: optionNodes,
    activeIndex: focusIndex,
    selectedIndex,
    onNavigate: setFocusIndex,
    loop: options.length >= 8,
  })

  const interactions = useInteractions([click, dismiss, role, listNav])

  return {
    interactions,
    setSelectedIndex,
    selectedIndex,
    focusIndex,
  }
}

interface PropsGetterArgs extends FloatingProps {
  interactions: ReturnType<typeof useInteractions>
  selectedOption: SelectOption | null
  selectedIndex: number | null
  focusIndex: number | null
  selectOption: (index: number) => void
  optionNodes: MutableRefObject<(HTMLElement | null)[]>
}

const useTriggerProps = ({
  interactions: { getReferenceProps },
  context: { refs },
  selectedOption,
}: PropsGetterArgs) =>
  getReferenceProps({
    ref: refs.setReference,
    "aria-label": selectedOption?.label ?? selectedOption?.value,
    "aria-autocomplete": "none",
  })

const useFloatingProps = ({
  interactions: { getFloatingProps },
  context: { refs },
  x,
  y,
  strategy,
}: PropsGetterArgs) =>
  getFloatingProps({
    ref: refs.setFloating,
    style: {
      position: strategy,
      top: y ?? 0,
      left: x ?? 0,
    },
  })

const useOptionProps = ({
  interactions: { getItemProps },
  context: { dataRef },
  focusIndex,
  selectedIndex,
  selectOption,
  optionNodes,
}: PropsGetterArgs) => {
  const events = (index: number) => ({
    onClick: () => selectOption(index),
    onKeyDown: (event: KeyboardEvent) => {
      if (
        event.key === "Enter" ||
        (event.key === " " && !dataRef.current.typing)
      ) {
        event.preventDefault()
        selectOption(index)
      }
    },
  })

  const data = (index: number) => ({
    "data-focused": index === focusIndex,
    "data-selected": index === selectedIndex,
  })

  return (index: number) =>
    getItemProps({
      ref: node => (optionNodes.current[index] = node),
      role: "option",
      tabIndex: index === focusIndex ? 0 : -1,
      "aria-selected": index === selectedIndex && index === focusIndex,
      ...data(index),
      ...events(index),
    })
}

const useElementProps = (args: PropsGetterArgs) => {
  const triggerProps = useTriggerProps(args)
  const floatingProps = useFloatingProps(args)
  const getOptionProps = useOptionProps(args)

  return {
    triggerProps,
    floatingProps,
    getOptionProps,
  }
}

const middleware = [
  offset(spacing.px.xxs),
  flip({ padding: spacing.px.sm }),
  size({
    padding: spacing.px.sm,
    apply: ({ rects, elements, availableHeight }) => {
      Object.assign(elements.floating.style, {
        maxHeight: `${availableHeight}px`,
        width: `${rects.reference.width}px`,
      })
    },
  }),
]

const getSelectedIndex = (value: string, options: SelectOption[]) =>
  options.findIndex(option => option.value === value)

type Args<T extends string> = Pick<
  SelectProps<T>,
  "onChange" | "options" | "value"
>

export const useSelect = <T extends string>({
  options,
  onChange,
  value,
}: Args<T>) => {
  const [open, setOpen] = useState(false)

  const selectedIndex = getSelectedIndex(value, options)
  const selectedOption = options[selectedIndex]
  const setSelectedIndex = (index: number) => onChange(options[index].value)

  const floating = useFloating({
    placement: "bottom-start",
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware,
  })
  const { context } = floating

  const optionNodes = useRef<(HTMLElement | null)[]>([])

  const { focusIndex, interactions } = useSelectInteractions({
    optionNodes,
    options,
    context,
    selectedIndex,
    setSelectedIndex,
  })

  const selectOption = (index: number) => {
    setSelectedIndex(index)
    onChange(options[index].value)
    setOpen(false)
  }
  const elementProps = useElementProps({
    interactions,
    selectedOption,
    focusIndex,
    selectedIndex,
    selectOption,
    optionNodes,
    ...floating,
  })

  return {
    open,
    selectedOption,
    context,
    ...elementProps,
  }
}
