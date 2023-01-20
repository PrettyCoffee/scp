import { getBackground } from "./getBackground"
import { Page } from "./page"
import { Background, useGeneralStore } from "./store/General"

interface AppProps {
  windowPadding: number
  bg: Background
}

const AppWrapper = styled.div<AppProps>`
  ${({ theme: { tokens }, windowPadding, bg }) => css`
    text-align: center;
    color: ${tokens.text.default};
    height: 100%;
    width: 100%;
    padding: ${windowPadding}px;

    ${getBackground(bg)}
  `}
`

export const App = () => {
  const [general] = useGeneralStore()

  return (
    <AppWrapper windowPadding={general.windowPadding} bg={general.background}>
      <Page />
    </AppWrapper>
  )
}
