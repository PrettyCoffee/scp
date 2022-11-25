import React from "react"

import ReactDOM from "react-dom/client"

import { App } from "./App"
import { ThemeProvider } from "./theme/ThemeProvider"

const root = document.getElementById("root")

if (!root) throw new Error(`ERROR: Node with id "root" is missing.`)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
