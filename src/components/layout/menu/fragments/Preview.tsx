import { PropsWithChildren } from "react"

import { transition, TransitionStatus } from "./Content"
import { MODAL_Z_INDEX } from "../../../base/z-index"
import { ErrorBoundary } from "../../../utility"
import { useMenuContext } from "../utils/MenuContext"

const Layout = styled.div<TransitionStatus>(
  ({ status }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    pointer-events: none;

    position: fixed;
    inset: 0;
    right: var(--drawer-width);

    opacity: ${status === "open" ? 1 : 0};
    ${transition("opacity")};

    z-index: ${MODAL_Z_INDEX};
  `
)

export const Preview = (props: PropsWithChildren) => {
  const { status } = useMenuContext()
  return (
    <ErrorBoundary>
      <Layout
        aria-hidden
        status={status}
        {...props}
        onClick={e => e.stopPropagation()}
      />
    </ErrorBoundary>
  )
}
