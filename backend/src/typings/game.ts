import { MapSchema, Schema, type } from "@colyseus/schema"

import { PlayerDataClass } from "@typings/player"

export const gameEventsArray = [
  "gameEnded",
  "setShipsRandom",
  "makeFire",
  "deleteShip",
  "setShip",
  "unknownAction"
] as const
export type GameEvents = (typeof gameEventsArray)[number]

export const gameErrorsArray = [
  "alreadyStarted",
  "notStarted",
  "notYourMove",
  "notAllowed",
  "thisTypeOverloaded",
  "collisionMatched",
  "alreadyPointed"
] as const
export type GameErrors = (typeof gameErrorsArray)[number]

export function isGameEvent(type: string | number): type is GameEvents {
  return (
    typeof type === "string" && gameEventsArray.includes(type as GameEvents)
  )
}

export type GameStatus = "waiting" | "playing" | "ended"

export type GameType = "private" | "public"

export class MyState extends Schema {
  @type("number") bet: number
  @type("number") createdAt: number
  @type("number") maxRoundDuration: number

  @type("string") type: GameType
  @type("string") status: GameStatus
  @type("number") currentPlayer: number

  @type({ map: PlayerDataClass })
  players: MapSchema<PlayerDataClass, string> = new MapSchema<PlayerDataClass>()
}

export type GameMetadata = {
  creatorName: string
  creatorId: number
  bet: number
}
