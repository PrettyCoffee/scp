import * as React from "react"

import { useMenu } from "./useMenu"

type ContextType =
  | (ReturnType<typeof useMenu> & { labelId: string; descriptionId: string })
  | null

const MenuContext = React.createContext<ContextType>(null)

export const MenuProvider = MenuContext.Provider

export const useMenuContext = () => {
  const context = React.useContext(MenuContext)
  if (context == null) throw new Error("No MenuContext found")
  return context
}
