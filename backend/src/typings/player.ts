import { ArraySchema, filterChildren, Schema, type } from "@colyseus/schema"
import { Client } from "colyseus"
import { MyState } from "@typings/game"

export type PlayerStatus = "online" | "offline" | "afk"

export class PlayerClass extends Schema {
  @type("number") id: number
  @type("string") name: string
  @type("string") language: string
}

export type Player = InstanceType<typeof PlayerClass>

export class BattleMapClass extends Schema {
  @type("number") x: number
  @type("number") y: number
  @type("boolean") hit?: boolean
  @type("boolean") miss?: boolean
  @type("boolean") marked?: boolean

  constructor(
    x: number,
    y: number,
    hit: boolean = false,
    miss: boolean = false,
    marked: boolean = false
  ) {
    super()

    this.x = x
    this.y = y
    this.hit = hit
    this.miss = miss
    this.marked = marked
  }
}

export type ShipDirection = "horizontal" | "vertical"

export class ShipClass extends Schema {
  @type("number") x: number
  @type("number") y: number

  @type("number") length: number
  @type("string") direction: ShipDirection
  @type("boolean") hit: boolean
  @type("boolean") sunk: boolean

  constructor(
    x: number,
    y: number,
    length: number,
    direction: ShipDirection,
    hit: boolean = false,
    sunk: boolean = false
  ) {
    super()

    this.x = x
    this.y = y
    this.length = length
    this.direction = direction
    this.hit = hit
    this.sunk = sunk
  }
}

export class PlayerDataClass extends Schema {
  @type(PlayerClass) info = new PlayerClass()

  @type("string") status: PlayerStatus

  @type("number") winAmount?: number
  @type([BattleMapClass]) battleMap = new ArraySchema<BattleMapClass>()

  @filterChildren(function (
    this: PlayerDataClass,
    client: Client<Player>,
    key: string,
    value: ShipClass,
    root: MyState
  ) {
    const player = root.players.get(String(client.userData?.id))

    if (!player || typeof player.ships === "undefined") return false

    return value.sunk || player.info.id === this.info.id
  })
  @type([ShipClass])
  ships = new ArraySchema<ShipClass>()
}

export interface ConnectOptions {
  player: {
    id: number
    name: string
    language: string
  }
  id: string
}
