import { MoveContext } from "@actions/onMessage"
import { MessageInput } from "@typings/socket"

export function deleteShip({
  client,
  message: { ship },
  player,
  room
}: MoveContext) {
  if (room.state.status === "playing")
    return client.send("game", {
      type: "alreadyStarted"
    } as MessageInput)

  const shipIndex = player.ships.findIndex(
    (element) => element.x === ship.x && element.y === ship.y
  )
  player.ships.splice(shipIndex, 0)
}
