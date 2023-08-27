import { ArraySchema, filter, Schema, type } from "@colyseus/schema"
import { Client } from "colyseus"
import { MyState } from "@typings/game"

export type PlayerStatus = "online" | "offline" | "afk"

export class PlayerClass extends Schema {
  @type("number") id: number
  @type("string") name: string
  @type("string") language: string
}

export type Player = InstanceType<typeof PlayerClass>

export const Ships = [0, 1, 2, 3, 4]
export type ShipsTypeTypes = (typeof Ships)[number]

export class BattleMapClass extends Schema {
  @type("number") x: number
  @type("number") y: number

  @filter(function (
    client: Client<Player>,
    value: ShipsTypeTypes,
    root: MyState
  ) {
    console.log(value, client.userData, root.players.toJSON())

    return true
  })
  @type("number")
  ship?: ShipsTypeTypes

  @type("boolean") hit?: boolean
  @type("boolean") sunk?: boolean
  @type("boolean") miss?: boolean

  constructor(
    x: number,
    y: number,
    ship?: ShipsTypeTypes,
    hit?: boolean,
    sunk?: boolean,
    miss?: boolean
  ) {
    super()

    this.x = x
    this.y = y
    this.ship = ship
    this.hit = hit
    this.sunk = sunk
    this.miss = miss
  }
}

export class PlayerDataClass extends Schema {
  @type(PlayerClass) info = new PlayerClass()

  @type("string") status: PlayerStatus

  @type("boolean") isShipsPlaced: boolean

  @type([BattleMapClass]) map = new ArraySchema<BattleMapClass>()
}

export interface ConnectOptions {
  player: {
    id: number
    name: string
    language: string
  }
  id: string
}
