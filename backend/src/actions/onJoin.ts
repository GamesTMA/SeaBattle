import {MyRoom} from "@typings/room"
import {MessageInput} from "@typings/socket";
import {Player, PlayerDataClass} from "@typings/player";
import {Client} from "colyseus";
import {ArraySchema} from "@colyseus/schema";
import {startGame} from "@helpers/startGame";

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

  const startMap = Array.from(Array(100), _ => 'null')
  player.map = new ArraySchema<string>(
    ...startMap
  )

  this.state.players.set(String(client.userData.id), player)

  if (this.state.players.size === 2) void startGame(this)
}
