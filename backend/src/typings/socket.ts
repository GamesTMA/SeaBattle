import { GameErrors, GameEvents } from "./game"
import { ShipsClass } from "@typings/player"

export type MessageInit = {
  type: GameEvents
  ship: ShipsClass
}

export type MessageInput = {
  type: GameEvents | GameErrors
}
