import { GameErrors, GameEvents } from "./game"
import { PlayerDataClass } from "@typings/player"

export type MessageInit = {
  type: GameEvents
  positions: PlayerDataClass["map"]
}

export type MessageInput = {
  type: GameEvents | GameErrors
}
