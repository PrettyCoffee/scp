import react from "@vitejs/plugin-react"
// eslint-disable-next-line import/no-unresolved
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    AutoImport({
      dts: "src/@types/auto-import.d.ts",
      imports: [
        {
          "@emotion/react": ["css", "keyframes"],
          "@emotion/styled": [["default", "styled"]],
        },
      ],
    }),
  ],
})
