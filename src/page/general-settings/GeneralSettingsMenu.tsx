import { useState } from "react"

import {
  Accordion,
  AccordionRootProps,
  AccordionState,
  IconButton,
  Menu,
  Settings,
} from "~/components"
import { useBackground, useCustomCss, useSpacing } from "~/store"

import {
  CustomCssSettings,
  BackgroundSettings,
  SpacingSettings,
} from "./categories"
import { ExpandButton, ResetButton } from "./fragments"

const GeneralSettings = (
  props: Pick<AccordionRootProps, "open" | "onOpenChange">
) => {
  const spacing = useSpacing()
  const background = useBackground()
  const customCss = useCustomCss()

  return (
    <Accordion.Root {...props}>
      <Accordion.Item label="Spacing">
        <SpacingSettings />
        <ResetButton category="spacing" onReset={spacing.reset} />
      </Accordion.Item>

      <Accordion.Item label="Background">
        <BackgroundSettings />
        <ResetButton category="background" onReset={background.reset} />
      </Accordion.Item>

      <Accordion.Item label="Custom CSS">
        <CustomCssSettings />
        <ResetButton category="custom css" onReset={customCss.reset} />
      </Accordion.Item>
    </Accordion.Root>
  )
}

export const GeneralSettingsMenu = () => {
  const [open, setOpen] = useState<AccordionState>("all")

  return (
    <Menu.Root>
      <Menu.Trigger>
        {(ref, props) => (
          <IconButton
            setRef={ref}
            {...props}
            icon={Settings}
            caption="Open settings"
            look="compact"
          />
        )}
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Header title="General Settings">
          <ExpandButton open={open} onOpenChange={setOpen} />
        </Menu.Header>
        <GeneralSettings open={open} onOpenChange={setOpen} />
      </Menu.Content>
    </Menu.Root>
  )
}
