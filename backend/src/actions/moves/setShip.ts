import { MoveContext } from "@actions/onMessage"
import { MessageInput } from "@typings/socket"

export function setShip({ client, message, player, room }: MoveContext) {
  if (player.isShipsPlaced)
    return client.send("game", {
      type: "alreadyPlaced"
    } as MessageInput)
}
