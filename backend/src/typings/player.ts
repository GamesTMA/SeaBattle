import { ArraySchema, filter, Schema, type } from "@colyseus/schema"
import { Client } from "colyseus"
import { isArrayEqual } from "@utils/isArrayEqual"
import { MyState } from "@typings/game"

export type PlayerStatus = "online" | "offline" | "afk"

export class PlayerClass extends Schema {
  @type("number") id: number
  @type("string") name: string
  @type("string") language: string
}

export type Player = InstanceType<typeof PlayerClass>

export type ShipsType = [0, 1, 2, 3, 4]

export class BattleMapClass extends Schema {
  @type("number") x: number
  @type("number") y: number
  @type("number") ship: ShipsType
  @type("boolean") hit: boolean
  @type("boolean") sunk: boolean
  @type("boolean") miss: boolean
}

export class PlayerDataClass extends Schema {
  @type(PlayerClass) info = new PlayerClass()

  @type("string") status: PlayerStatus

  @type("boolean") isShipsPlaced: boolean

  @filter(function (
    client: Client<Player>,
    value: ArraySchema<BattleMapClass>,
    root: MyState
  ) {
    const player = root.players.get(String(client.userData?.id))

    if (!player || typeof player.map === "undefined") return false

    return isArrayEqual(player.map, value)
  })
  @type([BattleMapClass])
  map = new ArraySchema<BattleMapClass>()
}

export interface ConnectOptions {
  player: {
    id: number
    name: string
    language: string
  }
  id: string
}
