import { MyRoom } from "@typings/room"
import onMessage from "./onMessage"
import { Client } from "colyseus"
import { GameMetadata, MyState } from "@typings/game"
import { ConnectOptions, Player } from "@typings/player"
import { MessageInit } from "@typings/socket"

export default function onCreate(this: MyRoom, options: ConnectOptions) {
  if (options.id) this.roomId = options.id
  this.autoDispose = false

  const state = new MyState()
  state.createdAt = Date.now()
  state.status = "waiting"
  state.bet = 100

  this.setState(state)
  this.setSeatReservationTime(60)
  this.onMessage("game", (client: Client<Player>, options: MessageInit) =>
    onMessage(this, client, options)
  )

  void this.setMetadata({
    bet: state.bet,
    creatorId: options.player.id,
    creatorName: options.player.name
  } as GameMetadata)
}
