import { ShipClass } from "@typings/player"
import { makeBoard } from "@utils/makeBoard"

export function isOccupied(
  x: number,
  y: number,
  existingShips: Array<ShipClass>
): boolean {
  const board = makeBoard(existingShips)

  return board[y][x] === "occupied"
}
