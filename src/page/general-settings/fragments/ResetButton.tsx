import { useTheme } from "@emotion/react"

import { Button, Trash } from "~/components"
import { useGeneralStore } from "~/store"

export const ResetButton = () => {
  const { resetStore } = useGeneralStore()
  const { space } = useTheme()
  return (
    <div style={{ paddingLeft: space.md, paddingTop: space.sm }}>
      <Button
        look="danger"
        icon={Trash}
        caption="Reset settings"
        onClick={resetStore}
      />
    </div>
  )
}
