import { Button, Spacing, Trash } from "~/components"
import { useGeneralStore } from "~/store"

export const ResetButton = () => {
  const { resetStore } = useGeneralStore()
  return (
    <Spacing each="md">
      <Button
        look="danger"
        icon={Trash}
        caption="Reset settings"
        onClick={resetStore}
      />
    </Spacing>
  )
}
