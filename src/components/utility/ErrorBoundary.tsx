import { PropsWithChildren } from "react"

import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps,
} from "react-error-boundary"

const stackFilter = [
  "listenToNativeEvent",
  "withEmotionCache2/<",
  "ErrorBoundary2",
  "ErrorBoundary",
]

const handleError: ErrorBoundaryProps["onError"] = (error, info) => {
  console.log(error)

  const stack = info.componentStack
    .split("\n")
    .map(item => item.split("@")[0])
    .filter(item => !stackFilter.includes(item))

  console.log(`%cStacktrace: %c${stack.join("\n")}`, "font-size: 20px;")
}

const Error = () => <>💥 CABOOM 💥</>

export const ErrorBoundary = ({ children }: PropsWithChildren) => (
  <ReactErrorBoundary FallbackComponent={Error} onError={handleError}>
    {children}
  </ReactErrorBoundary>
)
