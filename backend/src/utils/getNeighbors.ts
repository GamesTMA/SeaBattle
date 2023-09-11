import { ShipClass } from "@typings/player"

export function getNeighbors(ship: ShipClass) {
  const neighbours = []

  for (let i = -1; i < ship.length + 1; i++) {
    const x = ship.direction === "horizontal" ? ship.x + i : ship.x - 1
    const y = ship.direction === "vertical" ? ship.y + i : ship.y - 1

    neighbours.push({ x, y })
  }

  for (let i = -1; i < ship.length + 1; i++) {
    const x = ship.direction === "horizontal" ? ship.x + i : ship.x + 1
    const y = ship.direction === "vertical" ? ship.y + i : ship.y + 1

    neighbours.push({ x, y })
  }

  neighbours.push({
    x: ship.direction === "horizontal" ? ship.x - 1 : ship.x,
    y: ship.direction === "vertical" ? ship.y - 1 : ship.y
  })
  neighbours.push({
    x: ship.direction === "horizontal" ? ship.x + ship.length : ship.x,
    y: ship.direction === "vertical" ? ship.y + ship.length : ship.y
  })

  return neighbours
}
