import { ThemeProp } from "../../base"

export const buttonStyles = ({
  theme: { border, space, tokens },
}: ThemeProp) => css`
  position: relative;

  --size: ${space.lg};
  height: var(--size);
  width: var(--size);
  min-height: var(--size);
  min-width: var(--size);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${tokens.text.default};
  border-radius: 50%;
  overflow: hidden;
  isolation: isolate;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus-visible {
    outline: ${border} ${tokens.accent};
  }

  &::before {
    content: "";
    position: absolute;
    inset: ${space.xxs};
    border-radius: 50%;
    z-index: -1;

    background-color: ${tokens.background.input};
    transition: 0.2s solid;
    transition-property: inset, background-color;
  }
  &:hover::before,
  &:focus-visible::before {
    inset: 0;
    background-color: ${tokens.background.hover};
  }
  &:active::before {
    inset: 0;
    background-color: ${tokens.background.press};
  }
`
