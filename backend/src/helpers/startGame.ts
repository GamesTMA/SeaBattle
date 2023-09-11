import { MyRoom } from "@typings/room"
import { updateUser } from "@helpers/updateUser"
import { randomInt } from "crypto"

export async function startGame(room: MyRoom): Promise<void> {
  let filled = true
  room.state.players.forEach((value) => {
    if (value.ships.length !== 10) filled = false
  })

  if (!filled || room.state.players.size !== 2) return

  room.state.currentPlayer = Number(
    Array.from(room.state.players.keys())[
      randomInt(Array.from(room.state.players.values()).length)
    ]
  )
  room.state.players.forEach((player) => {
    player.winAmount = undefined
  })
  room.state.status = "playing"
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  room.metadata.status = room.state.status

  const playersArray = Array.from(room.state.players.values())

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  await Promise.all(
    playersArray.map((player) =>
      updateUser(player.info.id, {
        $inc: { balance: -room.state.bet }
      })
    )
  )
}
