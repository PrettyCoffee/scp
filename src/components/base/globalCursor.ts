let currentCursor: string | null = null

const apply = (cursor: string) => {
  if (currentCursor) return
  const body = document.body
  body.style.setProperty("cursor", cursor)
  currentCursor = cursor
}

const reset = () => {
  const body = document.body
  body.style.removeProperty("cursor")
  currentCursor = null
}

export const globalCursor = {
  apply,
  reset,
}
