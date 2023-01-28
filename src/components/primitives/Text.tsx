import { PropsOf } from "@emotion/react"

import { ThemeProp } from "../base"

export interface FontProps {
  color?: "default" | "active" | "muted"
  weight?: "regular" | "medium" | "bold"
  size?: "small" | "medium" | "large" | "headline"
}

const fontSize = {
  small: 0.8,
  medium: 1,
  large: 1.2,
  headline: 1.5,
}

const weightLookup = {
  regular: 400,
  medium: 500,
  bold: 700,
}

export const fontStyles = ({
  theme: { space, tokens },
  color = "default",
  weight = "medium",
  size = "medium",
}: ThemeProp & FontProps) => css`
  font-family: Quicksand;
  font-size: calc(${space.md} * ${fontSize[size]});
  font-weight: ${weightLookup[weight]};
  color: ${color === "active" ? tokens.accent : tokens.text[color]};

  ::selection {
    background-color: ${tokens.background.input};
  }
`

export interface TextProps extends Omit<FontProps, "size"> {
  children: string | string[]
  ellipsis?: boolean
  noWrap?: boolean
  display?: "inline" | "inline-block" | "block"
}

const TextBase = styled.span<Omit<TextProps, "children"> & FontProps>(
  ({ theme, display = "inline", weight, color, ellipsis, noWrap, size }) => css`
    ${fontStyles({ theme, color, weight, size })}

    display: ${display};
    margin: 0;
    padding: 0;

    ${noWrap && "white-space: nowrap;"}
    ${ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
    `};
  `
)

type ElementAttributes = Pick<
  PropsOf<typeof TextBase>,
  "id" | "as" | "style" | "className"
>

const Small = (props: TextProps & ElementAttributes) => (
  <TextBase size="small" {...props} />
)

const Medium = (props: TextProps & ElementAttributes) => (
  <TextBase size="medium" {...props} />
)

const Large = (props: TextProps & ElementAttributes) => (
  <TextBase size="large" {...props} />
)

const Headline = (props: TextProps & ElementAttributes) => (
  <TextBase size="headline" {...props} />
)

export const Text = {
  Small,
  Medium,
  Large,
  Headline,
}
