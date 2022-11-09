import { useEffect, useState } from "react"

import { button, card, logo, readTheDocs } from "./App.css"
import reactLogo from "./assets/react.svg"
import { themeClass } from "./theme"

export const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.firstElementChild?.classList.add(themeClass)
  }, [])

  return (
    <div className={"App"}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img
            src="/vite.svg"
            className={logo({ tool: "vite" })}
            alt="Vite logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className={logo({ tool: "react" })}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={card}>
        <button className={button} onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
