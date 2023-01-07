interface PartialTheme {
  [key: string]: string | PartialTheme
}

type CssVariable = [varName: string, value: string]

interface Result {
  variables: CssVariable[]
  theme: PartialTheme
}

const varsFromObject = (prefix: string, obj: PartialTheme): Result => {
  const entries = Object.entries(obj)

  return entries.reduce<Result>(
    (result, [key, value]) => {
      const varName = `${prefix}-${key}`

      if (typeof value === "object") {
        const next = varsFromObject(varName, value)
        return {
          variables: [...result.variables, ...next.variables],
          theme: { ...result.theme, [key]: next.theme },
        }
      }

      return {
        variables: [...result.variables, [varName, value]],
        theme: { ...result.theme, [key]: `var(${varName})` },
      }
    },
    { variables: [], theme: {} }
  )
}

export const createCssVariables = <T extends PartialTheme>(themeObject: T) => {
  const { variables, theme } = varsFromObject(`-`, themeObject)
  const css = variables.reduce<string>(
    (result, [varName, value]) => `${result}${varName}:${value};`,
    ""
  )

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return { css, theme: theme as T }
}
