import { Accessor, createEffect, createSignal } from "solid-js"
import { Ships } from "~/components/map/ships"
import { PlayerDataClass } from "backend/src/typings/player"

const defaultFieldSize = 33

interface ParkingProps {
  battleMap: PlayerDataClass["battleMap"]
  ships: PlayerDataClass["ships"]
  size: Accessor<number>
}

export function Parking(props: ParkingProps) {
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
      <Ships ships={props.ships} fieldSize={fieldSize()} scale={scale()} />
    </figure>
  )
}
