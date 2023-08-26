import { Client } from "colyseus"
import { MyRoom } from "@typings/room"
import { isGameEvent } from "@typings/game"
import { Player, PlayerDataClass } from "@typings/player"
import { MessageInit } from "@typings/socket"
import { makeFire, setShip } from "@actions/moves"

export interface MoveContext {
  client: Client<Player>
  room: MyRoom
  message: MessageInit
  player: PlayerDataClass
  playerID: string
}

export default function onMessage(
  room: MyRoom,
  client: Client<Player>,
  message: MessageInit
) {
  if (!isGameEvent(message.type)) return

  const playerID = String(client.userData.id)
  const player = room.state.players.get(playerID)

  if (player) player.status = "online"

  const context: MoveContext = {
    client,
    message,
    player,
    playerID,
    room
  }

  switch (message.type) {
    case "setShip":
      return setShip(context)
    case "makeFire":
      return makeFire(context)
    default:
      return client.send("game", {
        type: "unknownAction"
      })
  }
}
