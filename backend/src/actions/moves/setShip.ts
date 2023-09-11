import { MoveContext } from "@actions/onMessage"
import { MessageInput } from "@typings/socket"
import { startGame } from "@helpers/startGame"
import { checkCollision } from "@utils/checkCollision"
import { ShipClass } from "@typings/player"

export function setShip({
  client,
  message: { ship },
  player,
  room
}: MoveContext) {
  if (room.state.status === "playing")
    return client.send("game", {
      type: "alreadyStarted"
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

  if (checkCollision(ship, player.ships))
    return client.send("game", {
      type: "collisionMatched"
    } as MessageInput)

  player.ships.push(new ShipClass(ship.x, ship.y, ship.length, ship.direction))

  return startGame(room)
}
