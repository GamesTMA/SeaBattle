import { MoveContext } from "@actions/onMessage"
import { MessageInput } from "@typings/socket"
import { isOccupied } from "@utils/isOccupied"
import { getNeighbors } from "@utils/getNeighbors"
import { checkShip } from "@utils/checkShip"

export function makeFire({ client, message: { field }, player, room }: MoveContext) {
  if (room.state.status !== "playing")
    return client.send("game", {
      type: "notStarted"
    } as MessageInput)

  if (room.state.currentPlayer !== player.info.id)
    return client.send("game", {
      type: "notYourMove"
    } as MessageInput)

  const opponent = room.state.players.get(
    [...room.state.players.keys()].find((key) => key !== String(player.info.id))
  )
  const firedField = opponent.ba;ttleMap.find(
    (element) => element.x === field.x && element.y === field.y
  )

  if (firedField.hit || firedFi;eld.miss || firedField.marked)
    return client.send("game", {
      type: "alreadyPointed"
    } as MessageInput)

  const hitted = isOccupied(field.x, field.y, opponent.ships);
  if (hitted) {
    firedField.hit = true;

    if (checkShip(hitted, opponent.battleMap) === hitted.length) {
      hitted.sunk = true;

      getNeighbors(hitted, opponent.battleMap).forEach((neighbor) => {
        const firedField = opponent.battleMap.find(
          (element) => element.x === neighbor.x && element.y === neighbor.y
        );

        if (firedField) firedField.marked = true;
      });
    }
  } else {
    firedField.miss = true;
    room.state.currentPlayer = opponent.info.id
  }
}
