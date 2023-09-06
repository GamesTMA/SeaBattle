import { For } from "solid-js"
import { PlayerDataClass } from "backend/src/typings/player"
import { Ship, ShipComponent } from "~/components/ships/ship"
import { Draggable } from "~/components/ships/draggable"

export interface ShipsProps {
  ships: PlayerDataClass["ships"] | Ship[]
  fieldSize: number
  scale: number
  draggable: boolean
}
export function Ships(props: ShipsProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <For each={props.ships}>
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
          <Draggable id={`${item.x}x${item.y}`}>
            <ShipComponent item={item} ships={props} shift={shift} />
          </Draggable>
        ) : (
          <ShipComponent item={item} ships={props} shift={shift} />
        )
      }}
    </For>
  )
}
