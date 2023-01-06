import { Tile } from "../components"

const Cross = styled.div(
  ({ theme: { tokens } }) => css`
    --border: 1px solid ${tokens.text.muted};

    ::before,
    ::after {
      content: "";
      position: fixed;
      inset: 0;
    }

    ::before {
      border-top: var(--border);
      border-bottom: var(--border);
      top: 50vh;
      height: 0;
      margin-top: -1px;
    }

    ::after {
      border-left: var(--border);
      border-right: var(--border);
      left: 50vw;
      margin-left: -1px;
      width: 0px;
    }
  `
)

export const Page = () => {
  return (
    <>
      <Cross />
      <Tile orientation={{ horizontal: "left", vertical: "top" }}>Tile #1</Tile>
      <Tile orientation={{ horizontal: "center", vertical: "top" }}>
        Tile #2
      </Tile>
      <Tile orientation={{ horizontal: "right", vertical: "top" }}>
        Tile #3
      </Tile>

      <Tile orientation={{ horizontal: "left", vertical: "center" }}>
        Tile #4
      </Tile>
      <Tile orientation={{ horizontal: "center", vertical: "center" }}>
        Tile #5
      </Tile>
      <Tile orientation={{ horizontal: "right", vertical: "center" }}>
        Tile #6
      </Tile>

      <Tile orientation={{ horizontal: "left", vertical: "bottom" }}>
        Tile #7
      </Tile>
      <Tile orientation={{ horizontal: "center", vertical: "bottom" }}>
        Tile #8
      </Tile>
      <Tile orientation={{ horizontal: "right", vertical: "bottom" }}>
        Tile #9
      </Tile>
    </>
  )
}
