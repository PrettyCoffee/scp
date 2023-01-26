import { PropsWithChildren, useState } from "react"

import { ClassNameProp } from "../base"
import { useEventListener } from "../hooks"
import { ErrorBoundary } from "../utility"

const Hidden = styled.span`
  display: inline-block;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`

export const VisuallyHidden = ({
  children,
  ...delegated
}: PropsWithChildren<ClassNameProp>) => {
  const [forceShow, setForceShow] = useState(false)

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEventListener({
      type: "keydown",
      listener: ({ key }) => key === "Alt" && setForceShow(true),
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEventListener({
      type: "keyup",
      listener: ({ key }) => key === "Alt" && setForceShow(false),
    })
  }

  return (
    <ErrorBoundary>
      {forceShow ? <>{children}</> : <Hidden {...delegated}>{children}</Hidden>}
    </ErrorBoundary>
  )
}
