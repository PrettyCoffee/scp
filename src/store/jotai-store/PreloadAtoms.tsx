import { Atom, useAtomValue } from "jotai"
import { useAtomDevtools } from "jotai-devtools"

import {
  backgroundAtom,
  customCssAtom,
  globalAtom,
  spacingAtom,
} from "./global"

const atoms: Atom<unknown>[] = [
  backgroundAtom,
  customCssAtom,
  spacingAtom,
  globalAtom,
]

const PreloadAtom = ({ atom }: { atom: Atom<unknown> }) => {
  useAtomValue(atom)
  useAtomDevtools(atom, {
    name: atom.debugLabel,
    enabled: process.env.NODE_ENV === "development",
  })
  return null
}

export const PreloadAtoms = () => (
  <>
    {atoms.map(atom => (
      <PreloadAtom key={atom.debugLabel} atom={atom} />
    ))}
  </>
)
