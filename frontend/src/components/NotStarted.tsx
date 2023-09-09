import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler
} from "@thisbeyond/solid-dnd"
import { BattleMap } from "@components/BattleMap"
import { Parking } from "@components/Parking"
import { ShipsProps } from "@components/Ships"
import { TagsProps } from "@components/BattleMap/Tags"
import { useContext } from "solid-js"
import { GameContext } from "@contexts/Game"
import { MessageInit } from "backend/src/typings/socket"
import { Ship } from "@components/Ships/Ship"

export interface NotStartedProps {
  battleMap: TagsProps["battleMap"]
  ships: ShipsProps["ships"]
}

export function NotStarted(props: NotStartedProps) {
  const { room } = useContext(GameContext)

  const onDragEnd: DragEventHandler = ({ droppable, draggable }) => {
    if (!droppable) return
    const ship = { ...draggable.data } as Ship
    ship.x = droppable.data.x
    ship.y = droppable.data.y
    room().send("game", {
      type: "setShip",
      ship
    } as MessageInit)
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
