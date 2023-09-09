import { PlayerStatus } from "backend/src/typings/player"
import { GameStatus, GameType } from "backend/src/typings/game"
import { Tag } from "@components/BattleMap/Tags/Tag"
import { Ship } from "@components/Ships/Ship"

export interface Player {
  id: number
  name: string
  language?: string
}

export interface PlayerData {
  info: Player
  status: PlayerStatus
  battleMap: Tag[]
  ships: Ship[]
}

export interface Game {
  bet: number
  createdAt: number
  maxRoundDuration: number

  type: GameType
  status: GameStatus
  currentPlayer: number

  players: Map<string, PlayerData>
}
