import { Button, Spacing, Trash } from "~/components"

interface ResetButtonProps {
  category: string
  onReset: () => void
}

export const ResetButton = ({ category, onReset }: ResetButtonProps) => (
  <Spacing top="md">
    <Button
      look="danger"
      icon={Trash}
      caption={`Reset ${category}`}
      onClick={onReset}
    />
  </Spacing>
)
