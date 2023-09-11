import { ShipClass } from "@typings/player"

type Cell = "empty" | "occupied"

export function makeBoard(existingShips: Array<ShipClass>): Cell[][] {
  const board: Cell[][] = Array.from({ length: 10 }, () =>
    Array<Cell>(10).fill("empty")
  )

  for (const ship of existingShips) {
    for (let i = 0; i < ship.length; i++) {
      const x = ship.direction === "horizontal" ? ship.x + i : ship.x
      const y = ship.direction === "vertical" ? ship.y + i : ship.y

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const newX = x + dx
          const newY = y + dy

          if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
            board[newY][newX] = "occupied"
          }
        }
      }
    }
  }

  return board
}
