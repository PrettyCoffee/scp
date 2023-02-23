import { Atom, useAtomValue } from "jotai"

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
  return null
}

export const PreloadAtoms = () => (
  <>
    {atoms.map(atom => (
      <PreloadAtom key={atom.debugLabel} atom={atom} />
    ))}
  </>
)
