import { Page } from "./page"

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

const AppWrapper = styled.div`
  ${({ theme: { tokens } }) => css`
    text-align: center;
    color: ${tokens.text.default};
    background-color: ${tokens.background.base};
    height: 100%;
    width: 100%;
  `}
`

const Relative = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

export const App = () => {
  return (
    <AppWrapper>
      <Relative>
        <Page />
      </Relative>
    </AppWrapper>
  )
}
