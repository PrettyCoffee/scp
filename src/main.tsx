import React from "react"

import ReactDOM from "react-dom/client"

import { App } from "./App"
import { Store } from "./store"
import { ThemeProvider } from "./theme"

const root = document.getElementById("root")

if (!root) throw new Error(`ERROR: Node with id "root" is missing.`)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Store>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Store>
  </React.StrictMode>
)
