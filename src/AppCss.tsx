export const AppWrapper = styled.div`
  ${({ theme: { space, tokens } }) => css`
    padding: ${space.lg};
    text-align: center;
    color: ${tokens.text.default};
    background-color: ${tokens.background.default};
    height: 100%;
    width: 100%;
  `}
`

const logoSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `

const logoColor = "--logo-color"
export const Logo = styled.img<{ tool: "react" | "vite" }>`
  ${({ theme: { space, color }, tool }) => css`
    height: calc(${space.xxl} * 2);
    padding: ${space.md};
    will-change: filter;
    transition: 0.2s;
    a:hover &,
    a:focus &,
    a:focus-visible & {
      filter: drop-shadow(0 0 ${space.lg} var(${logoColor}));
    }

    ${logoColor}: ${tool === "react" ? color.secondary : color.primary};

    ${tool === "react" &&
    css`
      animation: ${logoSpin} infinite 20s linear;
    `}
  `}
`

export const Card = styled.div`
  ${({ theme: { space } }) => css`
    padding: ${space.lg};
  `}
`

export const MutedText = styled.p`
  ${({ theme: { tokens } }) => css`
    color: ${tokens.text.muted};
  `}
`

export const Button = styled.button`
  ${({ theme: { tokens, border, space, color } }) => css`
    border-radius: 8px;
    border: ${border.primary};
    border-color: transparent;
    padding: ${space.sm} ${space.md};
    font-size: ${space.md};
    font-weight: 500;
    font-family: inherit;
    background-color: ${tokens.background.input};
    cursor: pointer;
    transition: border-color 0.25s;

    &:focus, &:focus-visible {
      outline: ${space.xxs} solid ${color.primary};
      background-color: ${tokens.background.hover};
    }
    &:hover {
      background-color: ${tokens.background.hover};
      border-color: color.primary;
    },
  `}
`
