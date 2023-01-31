export const Hr = styled.hr(
  ({ theme: { tokens } }) => css`
    border-color: ${tokens.background.input};
    width: 100%;
    margin: 0;
  `
)

const Layout = styled.div(
  ({ theme: { space } }) => css`
    width: 100%;
    padding: ${space.md};
  `
)

export const Separator = () => (
  <Layout>
    <Hr />
  </Layout>
)
