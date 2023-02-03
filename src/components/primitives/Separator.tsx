import { Root } from "@radix-ui/react-separator"

const Hr = styled(Root)(
  ({ theme: { tokens, space } }) => css`
    --thiccness: ${space["3xs"]};
    --length: calc(100% - 2 * ${space.md});

    background-color: ${tokens.text.muted};

    &[data-orientation="horizontal"] {
      height: var(--thiccness);
      min-height: var(--thiccness);
      width: var(--length);
      margin: 0 auto;
    }

    &[data-orientation="vertical"] {
      height: var(--length);
      width: var(--thiccness);
      min-width: var(--thiccness);
      margin: auto 0;
    }
  `
)

interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
}

export const Separator = ({ orientation = "horizontal" }: SeparatorProps) => (
  <Hr orientation={orientation} />
)
