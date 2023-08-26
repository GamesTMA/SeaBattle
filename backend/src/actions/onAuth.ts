import { Client, ServerError } from "colyseus"
import { MyRoom } from "@typings/room"
import { ConnectOptions, Player } from "@typings/player"

export default function onAuth(
  this: MyRoom,
  client: Client,
  options: ConnectOptions
) {
  if (
    !options ||
    !options.player ||
    typeof options.player.id !== "number" ||
    typeof options.player.name !== "string" ||
    typeof options.player.language !== "string"
  )
    return new ServerError(4001)

  client.userData = {
    id: options.player.id,
    language: options.player.language,
    name: options.player.name
  } as Player

  return true
}
