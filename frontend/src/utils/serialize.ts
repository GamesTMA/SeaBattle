import { MyState } from "backend/src/typings/game"
import { Game } from "~/typings/Game"
import { PlayerDataClass } from "backend/src/typings/player"

export function serialize(state: MyState, gameState: Game) {
  const unorderedPlayers = gameState.players

  const orderedPlayers: Map<string, PlayerDataClass> = new Map<
    string,
    PlayerDataClass
  >()
  for (const key of Array.from(state.players.keys())) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    orderedPlayers.set(key, unorderedPlayers[key])
  }

  gameState.players = orderedPlayers
}
