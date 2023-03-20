import { useState } from "react"

import { Atom, useAtomValue } from "jotai"
import { DevTools, useAtomDevtools } from "jotai-devtools"

import { useEventListener } from "~/components"

import {
  backgroundAtom,
  customCssAtom,
  globalAtom,
  spacingAtom,
} from "./global"
import { widgetsAtom } from "./widgets"

const StyledDevTools = styled.div`
  .jotai-devtools-shell {
    inset: auto 0 0 0;
    width: min(100%, 1000px);
    margin: 0 auto;
    border-radius: 8px 8px 0 0;
  }
`

const JotaiDevTools = () => {
  const [showDevTools, setShowDevTools] = useState(false)

  useEventListener({
    type: "keyup",
    listener: ({ key }) =>
      key === "AltGraph" && setShowDevTools(showDevTools => !showDevTools),
  })

  return !showDevTools ? null : (
    <StyledDevTools>
      <DevTools isInitialOpen theme="dark" />
    </StyledDevTools>
  )
}

const ReduxDevTools = ({ atom }: { atom: Atom<unknown> }) => {
  useAtomDevtools(atom, {
    name: atom.debugLabel,
    enabled: process.env.NODE_ENV === "development",
  })
  return null
}

const PreloadAtom = ({ atom }: { atom: Atom<unknown> }) => {
  useAtomValue(atom)
  return null
}

const atoms: Atom<unknown>[] = [
  backgroundAtom,
  customCssAtom,
  spacingAtom,
  globalAtom,
  widgetsAtom,
]

export const PreloadAtoms = () => (
  <>
    {atoms.map(atom => (
      <PreloadAtom key={atom.toString()} atom={atom} />
    ))}
    {!import.meta.env.DEV ? null : (
      <>
        <JotaiDevTools />
        {atoms.map(atom => (
          <ReduxDevTools key={atom.toString()} atom={atom} />
        ))}
      </>
    )}
  </>
)
