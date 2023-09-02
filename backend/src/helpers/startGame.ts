import { MyRoom } from "@typings/room"
import { updateUser } from "@helpers/updateUser"

export async function startGame(room: MyRoom): Promise<void> {
  let filled = true
  room.state.players.forEach((value) => {
    if (value.ships.length !== 10) filled = false
  })

  if (!filled || room.state.players.size !== 2) return

  room.state.status = "playing"
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
