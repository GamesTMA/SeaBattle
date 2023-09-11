import { useContext } from "solid-js"
import { DimensionContext } from "@contexts/Dimension"
import { MessageInit } from "backend/src/typings/socket"
import { GameContext } from "@contexts/Game"

export function RandomButton() {
  const { room } = useContext(GameContext)
  const { fieldSize, scale } = useContext(DimensionContext)

  return (
    <div
      style={{
        "background-image": `url('/sprite.png')`,
        "background-position": `0px 0px`,
        "background-size": `${scale() * 396}px ${scale() * 99}px`,
        "background-repeat": "no-repeat",
        width: `${fieldSize() * 4}px`,
        height: `${fieldSize()}px`,
        position: "absolute",
        left: `${7 * fieldSize()}px`,
        top: `${fieldSize()}px`,
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "font-size": `${scale() * 17}px`,
        "font-weight": 700,
        color: "#2e08ff"
      }}
      onClick={() =>
        room().send("game", {
          type: "setShipsRandom"
        } as MessageInit)
      }
    >
      Random
    </div>
  )
}
