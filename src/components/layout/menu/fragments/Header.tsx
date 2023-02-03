import { PropsWithChildren } from "react"

import { IconButton } from "../../../inputs"
import { Close, Separator, Text } from "../../../primitives"
import { ErrorBoundary } from "../../../utility"
import { useMenuContext } from "../utils/MenuContext"

const Layout = styled.div(
  ({ theme: { space } }) => css`
    order: 1;
    display: flex;
    align-items: center;
    height: ${space.xl};
    padding-right: ${space.sm};
    padding-left: calc(${space.md} + ${space.sm});
    gap: ${space.xs};
  `
)

const Spacer = styled.span`
  flex: 1 1 0;
`

interface HeaderProps {
  title: string
}

export const Header = ({ title, children }: PropsWithChildren<HeaderProps>) => {
  const { labelId, setOpen } = useMenuContext()

  return (
    <ErrorBoundary>
      <Layout>
        <Text.Headline
          id={labelId}
          as="h2"
          noWrap
          ellipsis
          color="muted"
          weight="medium"
        >
          {title}
        </Text.Headline>
        <Spacer />
        {children && (
          <>
            {children}
            <Separator orientation="vertical" />
            <span />
          </>
        )}
        <IconButton
          caption="Close menu"
          icon={Close}
          onClick={() => setOpen(false)}
        />
      </Layout>
    </ErrorBoundary>
  )
}
