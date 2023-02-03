import { Children, isValidElement, PropsWithChildren, ReactNode } from "react"

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react"
import Color from "color"

import { MODAL_Z_INDEX } from "../../../base/z-index"
import { ErrorBoundary } from "../../../utility"
import { useMenuContext } from "../utils/MenuContext"
import { useMenu } from "../utils/useMenu"
import { Header } from "./Header"
import { Preview } from "./Preview"

export type TransitionStatus = Pick<ReturnType<typeof useMenu>, "status">

export const transition = (properties: string) =>
  css`
    transition: ${properties} 250ms ease-in-out;
  `

const SharedVars = styled.div(
  ({ theme: { space } }) => css`
    --drawer-width: calc(${space["3xl"]} * 6);
  `
)

const Backdrop = styled(FloatingOverlay)<TransitionStatus>(
  ({ theme: { raw }, status }) => css`
    position: fixed;
    background-color: ${Color(raw.tokens.background.base).alpha(0.5).string()};
    inset: 0;
    z-index: ${MODAL_Z_INDEX - 1};

    opacity: ${status === "open" ? 1 : 0};
    ${transition("opacity")};
  `
)

const Surface = styled.div<TransitionStatus>(
  ({ theme: { tokens, space, shadow }, status }) => css`
    width: var(--drawer-width);
    max-width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;

    transform: translateX(${status === "open" ? "0" : "var(--drawer-width)"});
    ${transition("transform")};

    display: flex;
    flex-direction: column;

    z-index: ${MODAL_Z_INDEX};
    background-color: ${tokens.background.surface};
    border-radius: ${space.md} 0 0 ${space.md};
    box-shadow: ${shadow.medium};
  `
)

const ScrollLayout = styled.div(
  ({ theme: { space } }) => css`
    padding: 0 ${space.sm};
    margin-bottom: ${space.md};
    padding-top: ${space.md};
    overflow-x: hidden;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    flex: 1 1 0;
  `
)

type Components = [header: ReactNode, preview: ReactNode, content: ReactNode[]]

const splitComponents = (children: ReactNode): Components => {
  const childrenArray = Children.map(children, child => child)
  const initValue: Components = [null, null, []]

  if (!childrenArray) return initValue

  return childrenArray.reduce<Components>(
    ([header, preview, content], child) => {
      if (isValidElement(child)) {
        if (child.type === Header) return [child, preview, content]
        if (child.type === Preview) return [header, child, content]
      }
      return [header, preview, [...content, child]]
    },
    initValue
  )
}

const Floating = ({ children }: PropsWithChildren) => {
  const { context: floatingContext, isMounted, status } = useMenuContext()

  return (
    <FloatingPortal>
      {isMounted && (
        <>
          <Backdrop status={status} lockScroll />
          <FloatingFocusManager context={floatingContext}>
            <>{children}</>
          </FloatingFocusManager>
        </>
      )}
    </FloatingPortal>
  )
}

export const Content = ({ children }: PropsWithChildren) => {
  const [header, preview, content] = splitComponents(children)
  const { refs, labelId, descriptionId, status, getFloatingProps } =
    useMenuContext()

  return (
    <ErrorBoundary>
      <Floating>
        <SharedVars>
          {preview}
          <Surface
            ref={refs.setFloating}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            status={status}
            {...getFloatingProps()}
          >
            {header}
            <ScrollLayout>{content}</ScrollLayout>
          </Surface>
        </SharedVars>
      </Floating>
    </ErrorBoundary>
  )
}
