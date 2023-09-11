import { createEffect, createSignal, useContext } from "solid-js"
import { Ships, ShipsProps } from "@components/Ships"
import { Ship } from "@components/Ships/Ship"
import { DimensionContext } from "@contexts/Dimension"
import { RandomButton } from "@components/Parking/RandomButton"

interface ParkingProps {
  ships: ShipsProps["ships"]
}

const ships = [
  [{ y: 0, x: 0, length: 4, direction: "horizontal" }],
  [
    { y: 2, x: 0, length: 3, direction: "horizontal" },
    { y: 2, x: 4, length: 3, direction: "horizontal" }
  ],
  [
    { y: 4, x: 0, length: 2, direction: "horizontal" },
    { y: 4, x: 3, length: 2, direction: "horizontal" },
    { y: 4, x: 6, length: 2, direction: "horizontal" }
  ],
  [
    { y: 6, x: 0, length: 1, direction: "horizontal" },
    { y: 6, x: 2, length: 1, direction: "horizontal" },
    { y: 6, x: 4, length: 1, direction: "horizontal" },
    { y: 6, x: 6, length: 1, direction: "horizontal" }
  ]
] as ShipsProps["ships"][]

export function Parking(props: ParkingProps) {
  const { fieldSize, size } = useContext(DimensionContext)

  const parkShips = () =>
    ships
      .map((element) => {
        const thisTypeShips = props.ships.reduce(
          (accumulator: number, currentValue: Ship) =>
            accumulator + (element[0]?.length === currentValue.length ? 1 : 0),
          0
        )

        element.splice(element.length - thisTypeShips, thisTypeShips)
        return element
      })
      .flat() as ShipsProps["ships"]

  const [parkedShips, setParkedShips] = createSignal<ShipsProps["ships"]>(
    [] as ShipsProps["ships"]
  )
  createEffect(() => setParkedShips(parkShips()))

  return (
    <figure
      style={{
        width: `${size() + fieldSize()}px`,
        height: `${size() + fieldSize()}px`,
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto"
      }}
    >
      <RandomButton />
      <Ships ships={parkedShips()} draggable droppable />
    </figure>
  )
}
