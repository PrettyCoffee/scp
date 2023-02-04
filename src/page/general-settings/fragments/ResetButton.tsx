import { Button, Spacing, Trash } from "~/components"
import { useGeneralStore } from "~/store"
import { GeneralStoreKey } from "~/store/General"

interface ResetButtonProps {
  category: string
  storeKey: GeneralStoreKey
}

export const ResetButton = ({ category, storeKey }: ResetButtonProps) => {
  const { resetStoreKey } = useGeneralStore()
  return (
    <Spacing top="md">
      <Button
        look="danger"
        icon={Trash}
        caption={`Reset ${category}`}
        onClick={() => resetStoreKey(storeKey)}
      />
    </Spacing>
  )
}
