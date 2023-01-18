import { Page } from "./page"
import { Background, useGeneralStore } from "./store/General"

/*
const GridBackground = styled.div`
  position: relative;
  ::before {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    content: "";
    mix-blend-mode: difference;
    opacity: 0.5;

    --grid-size: ${gridSize}px;
    --stroke-color: white;
    --stroke-width: 1px;

    background-size: var(--grid-size) var(--grid-size);
    background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent calc(var(--grid-size) - var(--stroke-width)),
        var(--stroke-color) calc(var(--grid-size) - var(--stroke-width)),
        var(--stroke-color) var(--grid-size)
      ),
      repeating-linear-gradient(
        -90deg,
        transparent,
        transparent calc(var(--grid-size) - var(--stroke-width)),
        var(--stroke-color) calc(var(--grid-size) - var(--stroke-width)),
        var(--stroke-color) var(--grid-size)
      );
  }
`
*/

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

    background-color: ${bg.base};
  `}
`

const Relative = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

export const App = () => {
  const [general] = useGeneralStore()

  return (
    <AppWrapper windowPadding={general.windowPadding} bg={general.background}>
      <Relative>
        <Page />
      </Relative>
    </AppWrapper>
  )
}
