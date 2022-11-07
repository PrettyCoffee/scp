import React from "react"

import ReactDOM from "react-dom/client"

import { App } from "./App"

import "./index.css"
// load global styles, imported in `theme/index.ts`
import "./theme"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
