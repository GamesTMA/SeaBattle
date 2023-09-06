import { ShipsProps } from "~/components/ships/index"
import { ShipDirection } from "backend/src/typings/player"

export interface Ship {
  x: number
  y: number
  length: number
  direction: ShipDirection
  hit?: boolean
  sunk?: boolean
}

export interface ShipProps {
  item: Ship
  ships: ShipsProps
  shift: number
}

export function ShipComponent(props: ShipProps) {
  return (
    <div
      style={{
        "background-image": `url('/sprite.png')`,
        "background-position": `${props.shift * -props.ships.scale}px ${0}px`,
        "background-size": `${props.ships.scale * 396}px ${
          props.ships.scale * 99
        }px`,
        "background-repeat": "no-repeat",
        width: `${props.ships.fieldSize * props.item.length}px`,
        height: `${props.ships.fieldSize}px`,
        position: "absolute",
        left: `${(props.item.x + 1) * props.ships.fieldSize}px`,
        top: `${(props.item.y + 1) * props.ships.fieldSize}px`,
        transform:
          props.item.direction === "vertical"
            ? "rotate(-90deg) translate(-25%, -50%)"
            : ""
      }}
    />
  )
}
