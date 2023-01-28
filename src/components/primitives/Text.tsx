import { PropsOf } from "@emotion/react"

import { ThemeProp } from "../base"

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

const fontStyle = {
  monospace: "'Fira Code', monospace",
  "sans-serif": "'Quicksand', sans-serif",
}

const getFontColor = ({
  theme: {
    tokens,
    color: { red },
  },
  color = "default",
}: ThemeProp & Pick<FontProps, "color">) => {
  if (color === "active") return tokens.accent
  if (color === "danger") return red
  return tokens.text[color]
}

export interface FontProps {
  color?: "default" | "active" | "muted" | "danger"
  weight?: "regular" | "medium" | "bold"
  size?: "small" | "medium" | "large" | "headline"
  style?: "sans-serif" | "monospace"
}

export const fontStyles = ({
  theme,
  theme: { space, tokens },
  color,
  weight = "medium",
  size = "medium",
  style = "sans-serif",
}: ThemeProp & FontProps) => css`
  font-family: ${fontStyle[style]};
  font-size: calc(${space.md} * ${fontSize[size]});
  font-weight: ${weightLookup[weight]};
  color: ${getFontColor({ theme, color })};

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
