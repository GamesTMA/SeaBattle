import { useContext } from "solid-js"
import { DimensionContext } from "~/contexts/Dimension"

export function RandomButton() {
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
        "font-size": `${scale() * 16}px`,
        "font-weight": 700,
        color: "#2e08ff"
      }}
    >
      Text
    </div>
  )
}
