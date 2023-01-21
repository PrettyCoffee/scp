import { isValidElement, Children, PropsWithChildren, ReactNode } from "react"

const Start = ({ children }: PropsWithChildren) => <>{children}</>
const Center = ({ children }: PropsWithChildren) => <>{children}</>
const End = ({ children }: PropsWithChildren) => <>{children}</>

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
  ({ theme: { tokens, space, shadow, border } }) => css`
    height: calc(${space.md} * 2.5);
    min-width: max-content;
    padding: 0 ${space.xs};

    display: flex;
    align-items: center;
    gap: ${space.xs};

    border: ${tokens.text.muted} ${border};
    background-color: ${tokens.background.alt};
    border-radius: 50vh;
    box-shadow: ${shadow.medium};
  `
)

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  z-index: 2;
`

const Root = ({ children }: PropsWithChildren) => {
  const { start, center, end } = getComponents(children)

  return (
    <Container>
      <StartContent>
        {start.length > 0 && <HeaderItem>{start}</HeaderItem>}
      </StartContent>
      <CenterContent>
        {center.length > 0 && <HeaderItem>{center}</HeaderItem>}
      </CenterContent>
      <EndContent>
        {end.length > 0 && <HeaderItem>{end}</HeaderItem>}
      </EndContent>
    </Container>
  )
}

export const Header = {
  Root,
  Start,
  Center,
  End,
}
