import { useState } from "react"

import {
  Accordion,
  AccordionRootProps,
  AccordionState,
  IconButton,
  Menu,
  Settings,
} from "~/components"

import {
  CustomCssSettings,
  BackgroundSettings,
  SpacingSettings,
} from "./categories"
import { ExpandButton, ResetButton } from "./fragments"

const GeneralSettings = (
  props: Pick<AccordionRootProps, "open" | "onOpenChange">
) => (
  <Accordion.Root {...props}>
    <Accordion.Item label="Spacing">
      <SpacingSettings />
      <ResetButton category="spacing" storeKey="spacing" />
    </Accordion.Item>

    <Accordion.Item label="Background">
      <BackgroundSettings />
      <ResetButton category="background" storeKey="background" />
    </Accordion.Item>

    <Accordion.Item label="Custom CSS">
      <CustomCssSettings />
      <ResetButton category="custom css" storeKey="customCss" />
    </Accordion.Item>
  </Accordion.Root>
)

export const GeneralSettingsMenu = () => {
  const [open, setOpen] = useState<AccordionState>("all")

  return (
    <Menu.Root initialOpen>
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
