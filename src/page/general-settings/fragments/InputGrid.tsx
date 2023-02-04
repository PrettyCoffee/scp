export const InputGrid = styled.div<{ columns?: number }>(
  ({ theme: { space }, columns = 2 }) => css`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    gap: ${space.md};
    > * {
      flex: 1;
    }
  `
)
