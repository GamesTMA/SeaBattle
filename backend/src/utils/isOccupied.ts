import { ShipClass } from "@typings/player"

type Cell = "empty" | ShipClass

export function isOccupied(
  x: number,
  y: number,
  existingShips: Array<ShipClass>
): false | ShipClass {
  const board: Cell[][] = Array.from({ length: 10 }, () =>
    Array<Cell>(10).fill("empty")
  )

  for (const ship of existingShips) {
    for (let i = 0; i < ship.length; i++) {
      const x = ship.direction === "horizontal" ? ship.x + i : ship.x
      const y = ship.direction === "vertical" ? ship.y + i : ship.y

      board[y][x] = ship
    }
  }

  return board[y][x] !== "empty" ? (board[y][x] as ShipClass) : false
}
