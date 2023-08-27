import { PlayerDataClass } from "backend/src/typings/player"
import { GameStatus, GameType } from "backend/src/typings/game"

export interface Game {
  bet: number
  createdAt: number
  maxRoundDuration: number

  type: GameType
  status: GameStatus
  currentPlayer: number

  players: Map<string, PlayerDataClass>
}
