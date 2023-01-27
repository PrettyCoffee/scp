import { IconButton } from "../../../inputs"
import { Close, Text } from "../../../primitives"
import { ErrorBoundary } from "../../../utility"
import { useMenuContext } from "../utils/MenuContext"

interface HeaderProps {
  title: string
}

const Layout = styled.div(
  ({ theme: { space } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${space.xl};
    padding-right: ${space.sm};
    padding-left: ${space.md};
  `
)

export const Header = ({ title }: HeaderProps) => {
  const { labelId, setOpen } = useMenuContext()

  return (
    <ErrorBoundary>
      <Layout>
        <Text.Large id={labelId} as="h2" noWrap ellipsis weight="bold">
          {title}
        </Text.Large>
        <IconButton
          caption="Close menu"
          icon={Close}
          onClick={() => setOpen(false)}
        />
      </Layout>
    </ErrorBoundary>
  )
}
