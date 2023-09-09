import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler
} from "@thisbeyond/solid-dnd"
import { BattleMap } from "@components/BattleMap"
import { Parking } from "@components/Parking"
import { ShipsProps } from "@components/Ships"
import { TagsProps } from "@components/BattleMap/Tags"

export interface NotStartedProps {
  battleMap: TagsProps["battleMap"]
  ships: ShipsProps["ships"]
}

export function NotStarted(props: NotStartedProps) {
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
