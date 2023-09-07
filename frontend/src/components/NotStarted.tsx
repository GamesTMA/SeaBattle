import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler
} from "@thisbeyond/solid-dnd"
import { BattleMap } from "~/components/map"
import { Parking } from "~/components/parking"
import { ShipsProps } from "~/components/ships"
import { TagsProps } from "~/components/map/tags"

export interface DragDropProps {
  battleMap: TagsProps["battleMap"]
  ships: ShipsProps["ships"]
}

export function NotStarted(props: DragDropProps) {
  const onDragEnd: DragEventHandler = ({ droppable, draggable }) => {
    console.log(droppable, draggable)
  }

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />
      <BattleMap
        battleMap={props.battleMap}
        ships={props.ships}
        droppable={true}
      />
      <Parking ships={props.ships} />
    </DragDropProvider>
  )
}
