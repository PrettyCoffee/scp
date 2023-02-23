import { PropsWithChildren } from "react"

import { PreloadAtoms } from "./PreloadAtoms"

export const Store = ({ children }: PropsWithChildren) => (
  <>
    <PreloadAtoms />
    {children}
  </>
)
