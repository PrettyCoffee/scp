import { atom } from "jotai"

import { widgetsAtom } from "../widgetsAtom"

const idAtom = atom(get => get(widgetsAtom).map(({ id }) => id))

export const nextIdAtom = atom(get => {
  const ids = get(idAtom)
  let i = 0
  for (; ids.includes(String(i)); i++);
  return String(i)
})
