import { Accessor, createEffect, createSignal } from "solid-js"
import { Tags } from "~/components/map/tags"
import { Ships, ShipsProps } from "~/components/ships"
import { PlayerDataClass } from "backend/src/typings/player"

const defaultFieldSize = 33

export interface BattleMapProps {
  battleMap: PlayerDataClass["battleMap"]
  ships: ShipsProps["ships"]
  size: Accessor<number>
  droppable: boolean
}

export function BattleMap(props: BattleMapProps) {
  const [fieldSize, setFieldSize] = createSignal(defaultFieldSize)
  const [scale, setScale] = createSignal(1)

  createEffect(() => {
    setFieldSize(props.size() / 11)
    setScale(fieldSize() / defaultFieldSize)
  })

  return (
    <figure
      style={{
        width: `${props.size() + fieldSize()}px`,
        height: `${props.size() + fieldSize()}px`,
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
          "background-size": `${props.size() + fieldSize()}px ${
            props.size() + fieldSize()
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
        droppable={props.droppable}
      />
      <Ships
        ships={props.ships}
        fieldSize={fieldSize()}
        scale={scale()}
        draggable={false}
      />
    </figure>
  )
}
