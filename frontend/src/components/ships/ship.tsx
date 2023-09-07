import { ShipsProps } from "~/components/ships/index"
import { ShipDirection } from "backend/src/typings/player"
import { JSX, useContext } from "solid-js"
import { DimensionContext } from "~/contexts/Dimension"

export interface Ship {
  x: number
  y: number
  length: number
  direction: ShipDirection
  hit?: boolean
  sunk?: boolean
  style?: JSX.CSSProperties
}

export interface ShipProps {
  item: Ship
  ships: ShipsProps
  shift: number
}

export function ShipComponent(props: ShipProps) {
  const { scale } = useContext(DimensionContext)

  return (
    <div
      style={{
        "background-image": `url('/sprite.png')`,
        "background-position": `${props.shift * -scale()}px ${0}px`,
        "background-size": `${scale() * 396}px ${scale() * 99}px`,
        "background-repeat": "no-repeat",
        width: "100%",
        height: "100%"
      }}
    />
  )
}
