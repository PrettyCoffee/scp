const Tile = styled.div`
  ${({ theme: { space, border, tokens } }) => css`
    position: relative;
    align-items: center;
    border-radius: ${space.sm};
    border: ${border.primary};
    background-color: ${tokens.background.surface};
    height: 100px;
    width: 100px;
  `}
`

const SomeTile = () => {
  return <Tile>Tile</Tile>
}

export const Page = () => {
  return <SomeTile />
}
