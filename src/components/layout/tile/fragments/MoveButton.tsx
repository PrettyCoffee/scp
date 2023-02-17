export const MoveButton = styled.button(
  ({ theme: { space, border, tokens } }) => css`
    height: ${space.xl};
    width: ${space.xl};

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: ${space.sm};
    background-color: transparent;
    outline: none;
    border: none;

    :focus-visible {
      outline: ${border} ${tokens.accent};
    }
  `
)
