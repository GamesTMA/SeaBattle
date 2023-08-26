import { GameErrors, GameEvents } from "./game"

export type MessageInit = {
  type: GameEvents
  position: number
}

export type MessageInput = {
  type: GameEvents | GameErrors
}
