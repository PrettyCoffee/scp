import { PropsWithChildren } from "react"

import { PreloadAtoms } from "./jotai-store/PreloadAtoms"

export const Store = ({ children }: PropsWithChildren) => (
  <>
    <PreloadAtoms />
    {children}
  </>
)
