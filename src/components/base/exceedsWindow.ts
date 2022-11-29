import { Side } from "./baseProps"

export const exceedsWindow = ({
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
}: Partial<Record<Side, number>>) => {
  const { innerHeight, innerWidth } = window
  return top < 0 || bottom > innerHeight || left < 0 || right > innerWidth
}
