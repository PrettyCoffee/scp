import { StrictMode } from "react"

import { createRoot } from "react-dom/client"

import { App } from "./App"
import { PreloadAtoms } from "./store"
import { ThemeProvider } from "./theme"

const root = document.getElementById("root")

if (!root) throw new Error(`ERROR: Node with id "root" is missing.`)

createRoot(root).render(
  <StrictMode>
    <PreloadAtoms />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
