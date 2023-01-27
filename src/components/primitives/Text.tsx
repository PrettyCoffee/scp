export interface TextProps {
  children: string
  color?: "default" | "active" | "muted"
  ellipsis?: boolean
  noWrap?: boolean
  display?: "inline" | "inline-block" | "block"
  weight?: "regular" | "medium" | "bold"
}

const weightLookup = {
  regular: 400,
  medium: 500,
  bold: 700,
}

const TextBase = styled.span<Omit<TextProps, "children">>(
  ({
    theme: { space, tokens },
    color = "default",
    ellipsis,
    noWrap,
    display = "inline",
    weight = "medium",
  }) => css`
    display: ${display};
    margin: 0;
    padding: 0;
    font-size: calc(${space.md} * var(--font-size));
    font-family: Quicksand;
    font-weight: ${weightLookup[weight]};

    color: ${color === "active" ? tokens.accent : tokens.text[color]};
    ${noWrap && "white-space: nowrap;"}
    ${ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
    `};
  `
)

const Small = styled(TextBase)`
  --font-size: 0.8;
`

const Medium = styled(TextBase)`
  --font-size: 1;
`

const Large = styled(TextBase)`
  --font-size: 1.2;
`

const Headline = styled(TextBase)`
  --font-size: 1.5;
`

export const Text = {
  Small,
  Medium,
  Large,
  Headline,
}
