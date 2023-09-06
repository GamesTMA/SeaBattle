import {
  DragDropDebugger,
  DragDropProvider,
  DragDropSensors,
  DragEventHandler
} from "@thisbeyond/solid-dnd"
import { BattleMap } from "~/components/map"
import { Parking } from "~/components/parking"
import { ShipsProps } from "~/components/ships"
import { PlayerDataClass } from "backend/src/typings/player"
import { Accessor } from "solid-js"

export interface DragDropProps {
  size: Accessor<number>
  battleMap: PlayerDataClass["battleMap"]
  ships: ShipsProps["ships"]
}

export function NotStarted(props: DragDropProps) {
  const onDragEnd: DragEventHandler = ({ droppable, draggable }) => {
    console.log(droppable, draggable)
  }

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />
      <DragDropDebugger />
      <BattleMap
        size={props.size}
        battleMap={props.battleMap}
        ships={props.ships}
        droppable={true}
      />
      <Parking size={props.size} ships={props.ships} />
    </DragDropProvider>
  )
}
