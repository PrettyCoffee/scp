import { isValidElement, Children, PropsWithChildren, ReactNode } from "react"

import { useGeneralStore } from "~/store"

import { HEADER_Z_INDEX } from "../base/z-index"
import { ErrorBoundary } from "../utility"

const Start = ({ children }: PropsWithChildren) => (
  <ErrorBoundary>{children}</ErrorBoundary>
)
const Center = ({ children }: PropsWithChildren) => (
  <ErrorBoundary>{children}</ErrorBoundary>
)
const End = ({ children }: PropsWithChildren) => (
  <ErrorBoundary>{children}</ErrorBoundary>
)

interface Elements {
  start: ReactNode[]
  center: ReactNode[]
  end: ReactNode[]
}

const getComponents = (children: ReactNode) => {
  const elements: Elements = {
    start: [],
    center: [],
    end: [],
  }

  Children.forEach(children, child => {
    if (!isValidElement(child)) return
    switch (child.type) {
      case Start:
        elements.start.push(child)
        break
      case Center:
        elements.center.push(child)
        break
      case End:
        elements.end.push(child)
        break
    }
  })

  return elements
}

const HeaderLayoutItem = styled.div`
  flex: 1;
  display: flex;
`

const StartContent = styled(HeaderLayoutItem)`
  justify-content: flex-start;
`

const CenterContent = styled(HeaderLayoutItem)`
  flex: 0;
  justify-content: center;
`

const EndContent = styled(HeaderLayoutItem)`
  justify-content: flex-end;
`

const HeaderItem = styled.div(
  ({ theme: { tokens, space, shadow, border } }) => {
    const { customCss } = useGeneralStore()
    return css`
      height: ${space.lg};
      min-width: max-content;
      padding: 0 ${space.xs};

      display: flex;
      align-items: center;
      gap: ${space.xxs};

      border: ${tokens.text.muted} ${border};
      background-color: ${tokens.background.alt};
      border-radius: 50vh;
      box-shadow: ${shadow.medium};

      ${customCss.header}
    `
  }
)

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  z-index: ${HEADER_Z_INDEX};
`

const Root = ({ children }: PropsWithChildren) => {
  const { start, center, end } = getComponents(children)

  return (
    <ErrorBoundary>
      <Container>
        <StartContent>
          {start.length > 0 && (
            <HeaderItem data-align="start">{start}</HeaderItem>
          )}
        </StartContent>
        <CenterContent>
          {center.length > 0 && (
            <HeaderItem data-align="center">{center}</HeaderItem>
          )}
        </CenterContent>
        <EndContent>
          {end.length > 0 && <HeaderItem data-align="end">{end}</HeaderItem>}
        </EndContent>
      </Container>
    </ErrorBoundary>
  )
}

export const Header = {
  Root,
  Start,
  Center,
  End,
}
