import { MyState } from "backend/src/typings/game"
import { Game, PlayerData } from "~/typings/Game"

export function serialize(state: MyState, gameState: Game) {
  const unorderedPlayers = gameState.players

  const orderedPlayers = new Map<string, PlayerData>()
  for (const key of Array.from(state.players.keys())) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    orderedPlayers.set(key, unorderedPlayers[key])
  }

  gameState.players = orderedPlayers
}
