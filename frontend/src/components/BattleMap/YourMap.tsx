import { useContext } from "solid-js"
import { DimensionContext } from "@contexts/Dimension"

export function YourMap() {
  const { fieldSize, scale } = useContext(DimensionContext)

  return (
    <>
      <div
        style={{
          width: `${fieldSize() * 5}px`,
          height: `${fieldSize()}px`,
          position: "absolute",
          left: `${0.9 * fieldSize()}px`,
          top: `${-fieldSize()}px`,
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          "font-size": `${scale() * 17}px`,
          "font-weight": 700,
          color: "var(--tg-theme-text-color)"
        }}
      >
        Ваше поле ⬇️
      </div>
      <div
        style={{
          width: `${fieldSize() * 6}px`,
          height: `${fieldSize()}px`,
          position: "absolute",
          left: `${5 * fieldSize()}px`,
          top: `${-fieldSize()}px`,
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          "font-size": `${scale() * 17}px`,
          "font-weight": 700,
          color: "var(--tg-theme-text-color)"
        }}
      >
        Поле противника ⬆️
      </div>
    </>
  )
}
