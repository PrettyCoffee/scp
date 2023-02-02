import { inputStyles } from "../utils/inputStyles"

const shakeOn = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(-1px, 1px);
  }
`

const shakeOff = keyframes`
  0% {
    transform: translate(-1px, 1px);
  }
  50% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0, 0);
  }
`

export type ShakeState = "initial" | "on" | "off"

export const InputBorder = styled.div<{
  applyShake?: ShakeState
  valid?: boolean
}>(
  ({ theme, theme: { space }, applyShake, valid }) => css`
    ${inputStyles({ theme, valid })}

    height: ${space.lg};
    padding: 0;

    display: flex;
    align-items: center;

    animation-name: ${applyShake === "on"
      ? shakeOn
      : applyShake === "off"
      ? shakeOff
      : ""};
    animation-duration: 0.1s;
    animation-timing-function: ease-in-out;
  `
)
