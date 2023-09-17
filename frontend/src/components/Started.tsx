import { BattleMap } from "@components/BattleMap"
import { PlayerData } from "~/typings/Game"

export interface NotStartedProps {
  thisPlayer: PlayerData
  opponent: PlayerData
}

export function Started(props: NotStartedProps) {
  return (
    <>
      <BattleMap
        battleMap={props.opponent.battleMap}
        ships={props.opponent.ships}
        droppable={false}
        attackable
        your={false}
      />
      <BattleMap
        battleMap={props.thisPlayer.battleMap}
        ships={props.thisPlayer.ships}
        droppable={false}
        attackable={false}
        your
      />
    </>
  )
}
