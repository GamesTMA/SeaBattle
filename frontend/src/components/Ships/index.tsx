import { createEffect, createSignal, For, JSX, useContext } from "solid-js"
import { Ship, ShipComponent } from "@components/Ships/Ship"
import { Draggable } from "@components/Ships/Draggable"
import { DimensionContext } from "@contexts/Dimension"
import { MessageInit } from "backend/src/typings/socket"
import { GameContext } from "@contexts/Game"

export interface ShipsProps {
  ships: Ship[]
  draggable: boolean
  droppable: boolean
}

export function Ships(props: ShipsProps) {
  const { room } = useContext(GameContext)
  const { fieldSize } = useContext(DimensionContext)
  const [ships, setShips] = createSignal([] as ShipsProps["ships"])

  createEffect(() => {
    if (fieldSize())
      setShips(
        props.ships.map((item) => ({
          ...item,
          style: {
            width: `${fieldSize() * item.length}px`,
            height: `${fieldSize()}px`,
            position: "absolute",
            left: `${(item.x + 1) * fieldSize()}px`,
            top: `${(item.y + 1) * fieldSize()}px`,
            transform:
              item.direction === "vertical"
                ? `rotate(-90deg) translate(-${
                    fieldSize() * item.length - 1
                  }px, 0px)`
                : "",
            "transform-origin": "top left"
          } as JSX.CSSProperties
        }))
      )
  })

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <For each={ships()}>
      {(item: Ship) => {
        const shift =
          item.length === 4
            ? 0
            : item.length === 3
            ? 132
            : item.length === 2
            ? 231
            : 297

        return props.draggable ? (
          <Draggable data={item} style={item.style}>
            <ShipComponent item={item} ships={props} shift={shift} />
          </Draggable>
        ) : props.droppable ? (
          <div
            style={item.style}
            onClick={() =>
              room().send("game", {
                type: "deleteShip",
                ship: item
              } as MessageInit)
            }
          >
            <ShipComponent item={item} ships={props} shift={shift} />
          </div>
        ) : (
          <div style={item.style}>
            <ShipComponent item={item} ships={props} shift={shift} />
          </div>
        )
      }}
    </For>
  )
}
