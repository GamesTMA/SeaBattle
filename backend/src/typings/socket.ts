import { GameErrors, GameEvents } from "./game"
import { ShipClass } from "@typings/player"

export type MessageInit = {
  type: GameEvents
  ship: ShipClass
}

export type MessageInput = {
  type: GameEvents | GameErrors
}
