import { StrictMode } from "react"

import { createRoot } from "react-dom/client"

import { App } from "./App"
import { PreloadAtoms } from "./store"
import { ThemeProvider } from "./theme"

const root = document.getElementById("root")

if (!root) throw new Error(`ERROR: Node with id "root" is missing.`)

createRoot(root).render(
  <>
    {/* TODO: Move PreloadAtoms into StrictMode once the jotai-devtools bug is solved */}
    <PreloadAtoms />
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </>
)
