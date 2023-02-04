import { StrictMode } from "react"

import { createRoot } from "react-dom/client"

import { App } from "./App"
import { Store } from "./store"
import { ThemeProvider } from "./theme"

const root = document.getElementById("root")

if (!root) throw new Error(`ERROR: Node with id "root" is missing.`)

createRoot(root).render(
  <StrictMode>
    <Store>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Store>
  </StrictMode>
)
