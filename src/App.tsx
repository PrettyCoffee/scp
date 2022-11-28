import { Page } from "./page"
import { spacing } from "./theme/spacing"

export const gridSize = spacing.px.xl

const AppWrapper = styled.div`
  ${({ theme: { space, tokens } }) => css`
    padding: ${space.lg};
    text-align: center;
    color: ${tokens.text.default};
    background-color: ${tokens.background.base};
    height: 100%;
    width: 100%;
  `}
`

export const App = () => {
  return (
    <AppWrapper>
      <Page />
    </AppWrapper>
  )
}
