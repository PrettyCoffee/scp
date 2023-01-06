import { Tile } from "../components"

export const Page = () => {
  return (
    <>
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
