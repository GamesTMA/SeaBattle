import { MyRoom } from "@typings/room"
import { MessageInput } from "@typings/socket"
import { BattleMapClass, Player, PlayerDataClass } from "@typings/player"
import { Client } from "colyseus"
import { ArraySchema } from "@colyseus/schema"
import { startGame } from "@helpers/startGame"

export default function onJoin(this: MyRoom, client: Client<Player>) {
  if (this.state.status === "playing")
    return client.send("game", {
      type: "alreadyStarted"
    } as MessageInput)

  const player = new PlayerDataClass()
  player.info.id = client.userData.id
  player.info.name = client.userData.name
  player.info.language = client.userData.language
  player.status = "online"
  player.isShipsPlaced = false

  const startMap = Array.from({ length: 100 }, (_, i) => {
    const x = i % 10
    const y = Math.floor(i / 10)

    return new BattleMapClass(x, y)
  })
  player.battleMap = new ArraySchema<BattleMapClass>(...startMap)
  this.state.players.set(String(client.userData.id), player)

  if (this.state.players.size === 2) void startGame(this)
}
