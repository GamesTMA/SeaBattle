import { MyRoom } from "@typings/room"
import { updateUser } from "@helpers/updateUser"

export async function startGame(room: MyRoom): Promise<void> {
  room.state.status = "ended"
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
