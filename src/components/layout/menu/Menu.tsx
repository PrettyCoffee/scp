import { PropsWithChildren, useId } from "react"

import { Trigger, Content, Header, Preview } from "./fragments"
import { MenuProvider } from "./utils/MenuContext"
import { MenuOptions, useMenu } from "./utils/useMenu"
import { ErrorBoundary } from "../../utility"

export type MenuProps = MenuOptions

const Root = ({ children, ...options }: PropsWithChildren<MenuProps>) => {
  const menu = useMenu(options)
  const labelId = useId()
  const descriptionId = useId()
  return (
    <ErrorBoundary>
      <MenuProvider value={{ ...menu, descriptionId, labelId }}>
        {children}
      </MenuProvider>
    </ErrorBoundary>
  )
}

export const Menu = {
  Root,
  Trigger,
  Content,
  Header,
  Preview,
}
