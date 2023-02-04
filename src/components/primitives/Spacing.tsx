import { PropsWithChildren } from "react"

import { Size } from "~/theme/spacing"

interface SpacingProps {
  top?: Size
  right?: Size
  bottom?: Size
  left?: Size

  xAxis?: Size
  yAxis?: Size

  each?: Size
}

const Padding = styled.div<SpacingProps>(
  ({ theme: { space }, top, right, bottom, left, xAxis, yAxis, each }) => {
    const leftPadding = left ?? xAxis ?? each
    const rightPadding = right ?? xAxis ?? each
    const topPadding = top ?? yAxis ?? each
    const bottomPadding = bottom ?? yAxis ?? each
    return css`
      padding-left: ${leftPadding && space[leftPadding]};
      padding-right: ${rightPadding && space[rightPadding]};
      padding-top: ${topPadding && space[topPadding]};
      padding-bottom: ${bottomPadding && space[bottomPadding]};
    `
  }
)

export const Spacing = (props: PropsWithChildren<SpacingProps>) => (
  <Padding {...props} />
)
