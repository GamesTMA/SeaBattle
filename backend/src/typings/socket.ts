import { GameErrors, GameEvents } from "./game"
import { BattleMapClass, ShipClass } from "@typings/player"

export type MessageInit = {
  type: GameEvents
  ship?: ShipClass
  tag?: BattleMapClass
}

export type MessageInput = {
  type: GameEvents | GameErrors
}
