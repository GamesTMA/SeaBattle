import { PlayerDataClass, ShipClass } from "@typings/player"

export function checkShip(
  ship: ShipClass,
  battleMap: PlayerDataClass["battleMap"]
) {
  let hittedFields = 0

  for (let i = 0; i < ship.length; i++) {
    const x = ship.direction === "horizontal" ? ship.x + i : ship.x
    const y = ship.direction === "vertical" ? ship.y + i : ship.y

    const field = battleMap.find(
      (element) => element.x === x && element.y === y
    )

    if (field.hit) hittedFields++
  }

  return hittedFields
}
