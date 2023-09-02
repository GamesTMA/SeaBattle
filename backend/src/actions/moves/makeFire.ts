import { MoveContext } from "@actions/onMessage"
import { MessageInput } from "@typings/socket"

export function makeFire({
  client,
  message: { ship },
  player,
  room
}: MoveContext) {
  if (room.state.status !== "playing")
    return client.send("game", {
      type: "notStarted"
    } as MessageInput)
}
