import { MyRoom } from "@typings/room"
import { Player } from "@typings/player"
import { Client } from "colyseus"

export default function onLeave(this: MyRoom, client: Client<Player>) {
  const player = this.state.players.get(String(client.userData.id))

  if(!player) return

  player.status = "offline"
  this.state.players.set(String(client.userData.id), player)
}
