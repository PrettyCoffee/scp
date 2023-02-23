import { getBackground } from "./getBackground"
import { Page } from "./page"
import { Background, useBackground } from "./store"

interface AppProps {
  bg: Background
}

const AppWrapper = styled.div<AppProps>`
  ${({ theme: { tokens }, bg }) => css`
    text-align: center;
    color: ${tokens.text.default};
    height: 100%;
    width: 100%;

    ${getBackground(bg)}
  `}
`

export const App = () => {
  const background = useBackground()

  return (
    <AppWrapper bg={background.value}>
      <Page />
    </AppWrapper>
  )
}
