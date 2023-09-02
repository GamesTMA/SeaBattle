import { MoveContext } from "@actions/onMessage"
import { MessageInput } from "@typings/socket"
import { ShipDirection, ShipsClass } from "@typings/player"
import { checkCollision } from "@utils/checkCollision"
import { startGame } from "@helpers/startGame"

export function setShipsRandom({ client, player, room }: MoveContext) {
  if (room.state.status === "playing")
    return client.send("game", {
      type: "alreadyStarted"
    } as MessageInput)

  const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

  for (const shipLength of shipLengths) {
    let placed = false

    while (!placed) {
      const direction: ShipDirection =
        Math.random() > 0.5 ? "horizontal" : "vertical"

      const x = Math.floor(
        Math.random() * (direction === "horizontal" ? 10 - shipLength : 10)
      )
      const y = Math.floor(
        Math.random() * (direction === "vertical" ? 10 - shipLength : 10)
      )

      const newShip = new ShipsClass(x, y, shipLength, direction)

      if (!checkCollision(newShip, player.ships)) {
        player.ships.push(newShip)
        placed = true
      }
    }
  }

  return startGame(room)
}
