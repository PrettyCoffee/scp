import { useEffect, useState } from "react"

import { AppWrapper, Button, Card, Logo, MutedText } from "./AppCss"
import reactLogo from "./assets/react.svg"

export const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    //document.firstElementChild?.classList.add(themeClass)
  }, [])

  return (
    <AppWrapper>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Logo src="/vite.svg" tool="vite" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <Logo src={reactLogo} tool="react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <Button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <MutedText>Click on the Vite and React logos to learn more</MutedText>
    </AppWrapper>
  )
}
