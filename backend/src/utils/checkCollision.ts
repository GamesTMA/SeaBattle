import { ShipClass } from "@typings/player"
import { makeBoard } from "@utils/makeBoard"

export function checkCollision(
  newShip: ShipClass,
  existingShips: Array<ShipClass>
): boolean {
  const board = makeBoard(existingShips)
  for (let i = 0; i < newShip.length; i++) {
    const x = newShip.direction === "horizontal" ? newShip.x + i : newShip.x
    const y = newShip.direction === "vertical" ? newShip.y + i : newShip.y

    if (x < 0 || x >= 10 || y < 0 || y >= 10 || board[y][x] === "occupied")
      return true
  }

  return false
}
