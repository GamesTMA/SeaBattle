import { createSignal, onCleanup, onMount } from "solid-js"
import { Tags } from "~/components/map/tags"
import { Ships } from "~/components/map/ships"
import { PlayerDataClass } from "backend/src/typings/player"

const defaultFieldSize = 33

interface BattleMapProps {
  battleMap: PlayerDataClass["battleMap"]
  ships: PlayerDataClass["ships"]
}

export function BattleMap(props: BattleMapProps) {
  const [size, setSize] = createSignal(0)
  const [fieldSize, setFieldSize] = createSignal(defaultFieldSize)
  const [scale, setScale] = createSignal(1)

  const handlerSize = () => {
    setSize(
      window.innerWidth * 0.9 > (window.innerHeight * 0.9) / 2
        ? (window.innerHeight * 0.9) / 2
        : window.innerWidth * 0.9
    )
    setFieldSize(size() / 11)
    setScale(fieldSize() / defaultFieldSize)
  }
  onMount(() => {
    handlerSize()
    window.addEventListener("resize", handlerSize)
  })
  onCleanup(() => window.removeEventListener("resize", handlerSize))

  return (
    <>
      <figure
        style={{
          width: `${size() + fieldSize()}px`,
          height: `${size() + fieldSize()}px`,
          position: "relative",
          "margin-left": "auto",
          "margin-right": "auto"
        }}
      >
        <div
          style={{
            "background-image": `url('/grid.png')`,
            "background-size": `${fieldSize()}px ${fieldSize()}px`,
            width: "100%",
            height: "100%",
            position: "absolute"
          }}
        />
        <div
          style={{
            "background-image": `url('/map.png')`,
            "background-size": `${size() + fieldSize()}px ${
              size() + fieldSize()
            }px`,
            width: "100%",
            height: "100%",
            position: "absolute",
            "background-repeat": "no-repeat"
          }}
        />
        <Tags
          battleMap={props.battleMap}
          fieldSize={fieldSize()}
          scale={scale()}
        />
        <Ships ships={props.ships} fieldSize={fieldSize()} scale={scale()} />
      </figure>
    </>
  )
}
