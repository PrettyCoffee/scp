import React from "react"

import ReactDOM from "react-dom/client"

import { App } from "./App"

import "./index.css"
// load global styles, imported in `theme/index.ts`
import "./theme"

const root = document.getElementById("root")

if (!root) throw new Error(`ERROR: Node with id "root" is missing.`)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
