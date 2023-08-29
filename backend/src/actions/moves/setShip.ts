import { MoveContext } from "@actions/onMessage"
import { MessageInput } from "@typings/socket"
import { startGame } from "@helpers/startGame"

export function setShip({
  client,
  message: { ship },
  player,
  room
}: MoveContext) {
  if (player.isShipsPlaced)
    return client.send("game", {
      type: "alreadyPlaced"
    } as MessageInput)

  const thisTypeShips = player.ships.reduce(
    (accumulator, currentValue) =>
      accumulator + (ship.length === currentValue.length ? 1 : 0),
    0
  )
  if (
    (ship.length === 1 && thisTypeShips === 4) ||
    (ship.length === 2 && thisTypeShips === 3) ||
    (ship.length === 3 && thisTypeShips === 2) ||
    (ship.length === 4 && thisTypeShips === 1)
  )
    return client.send("game", {
      type: "thisTypeOverloaded"
    } as MessageInput)

  player.ships.push(ship)

  if (player.ships.length === 10) return startGame(room)
}
