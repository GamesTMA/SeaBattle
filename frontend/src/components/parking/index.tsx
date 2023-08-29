import { Accessor, createEffect, createSignal } from "solid-js"
import { Ship, Ships, ShipsProps } from "~/components/ships"
import { ShipsClass } from "backend/src/typings/player"

const defaultFieldSize = 33

interface ParkingProps {
  ships: ShipsProps["ships"]
  size: Accessor<number>
}

const ships = [
  [{ y: 0, x: 0, length: 4, direction: "right" }],
  [
    { y: 2, x: 0, length: 3, direction: "right" },
    { y: 2, x: 4, length: 3, direction: "right" }
  ],
  [
    { y: 4, x: 0, length: 2, direction: "right" },
    { y: 4, x: 3, length: 2, direction: "right" },
    { y: 4, x: 6, length: 2, direction: "right" }
  ],
  [
    { y: 6, x: 0, length: 1, direction: "right" },
    { y: 6, x: 2, length: 1, direction: "right" },
    { y: 6, x: 4, length: 1, direction: "right" },
    { y: 6, x: 6, length: 1, direction: "right" }
  ]
] as ShipsProps["ships"][]

export function Parking(props: ParkingProps) {
  const [fieldSize, setFieldSize] = createSignal(defaultFieldSize)
  const [scale, setScale] = createSignal(1)

  createEffect(() => {
    setFieldSize(props.size() / 11)
    setScale(fieldSize() / defaultFieldSize)
  })

  const parkShips = () =>
    ships
      .map((element) => {
        const thisTypeShips = props.ships.reduce(
          (accumulator: number, currentValue: Ship | ShipsClass) =>
            accumulator + (element[0].length === currentValue.length ? 1 : 0),
          0
        )

        element.splice(element.length - thisTypeShips, thisTypeShips)
        return element
      })
      .flat() as ShipsProps["ships"]

  const [parkedShips, setParkedShips] = createSignal<ShipsProps["ships"]>(
    {} as ShipsProps["ships"]
  )
  createEffect(() => setParkedShips(parkShips()))
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
      <Ships ships={parkedShips()} fieldSize={fieldSize()} scale={scale()} />
    </figure>
  )
}
