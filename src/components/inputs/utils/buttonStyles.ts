import { ThemeProp } from "../../base"

export interface ButtonStyleProps {
  look?: "compact" | "default"
}

export const buttonStyles = ({
  theme: { border, space, tokens },
  look,
}: ThemeProp & ButtonStyleProps) => css`
  position: relative;

  --size: ${look === "compact" ? `calc(${space.md} * 1.5)` : space.lg};
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
    inset: ${look === "compact" ? "50%" : space.xxs};
    border-radius: 50%;
    z-index: -1;

    background-color: ${tokens.background.input};
    transition: ${look === "compact" ? "0.1s" : "0.2s"} solid;
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
