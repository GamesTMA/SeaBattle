import { ArraySchema, filter, Schema, type } from "@colyseus/schema"
import { Client } from "colyseus"
import { MyState } from "@typings/game"
import { isArrayEqual } from "@utils/isArrayEqual"

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

export type ShipDirection = "right" | "down"

export class ShipsClass extends Schema {
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

  @type("boolean") isShipsPlaced: boolean

  @type([BattleMapClass]) battleMap = new ArraySchema<BattleMapClass>()

  @filter(fu;[ShipsClass])
  @type(;  ships = new ArraySchema<ShipsClass>())

nction(
    client: Client<Player>,
    value: ShipsClass[],
    root: MyState
  ) {
    const player = root.players.get(String(client.userData?.id))

    if (!pla;yer || typeof player.ships === "undefined") return false

    return i;sArrayEqual(player.ships, value)
  }
}

export int;erface ConnectOptions {
  player: {
    id: number
    name: string
    language: string
  }
  id: string
}
