import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  ParentProps
} from "solid-js"
import { Game, Player } from "~/typings/Game"
import * as Colyseus from "colyseus.js"
import { Room } from "colyseus.js"
import { MyState } from "backend/src/typings/game"
import { useSearchParams } from "@solidjs/router"
import { useSDK } from "@twa.js/sdk-solid"
import onMessage from "~/events/onMessage"
import { serialize } from "~/utils/serialize"

interface GameProps {
  game: Accessor<Game>
  room: Accessor<Room<MyState>>
  player: Accessor<Player>
}

const client = new Colyseus.Client(import.meta.env.VITE_WEB_SOCKETS)
export const GameContext = createContext({} as GameProps)

export function GameProvider(props: ParentProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [game, setGame] = createSignal({} as Game)
  const [player, setPlayer] = createSignal({} as Player)
  const [room, setRoom] = createSignal<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = createSignal(searchParams.tgWebAppStartParam)

  const { initData } = useSDK()

  const connectToGame = async () => {
    const inputData = initData()
    if (
      inputData === null ||
      inputData === undefined ||
      inputData.user === null
    )
      return console.error("no Data")

    setPlayer({
      id: inputData.user.id,
      name: inputData.user.firstName,
      language: inputData.user.languageCode
    })

    const params = {
      player: player(),
      id: gameId()
    }

    const delay = 1000
    const tryConnect = async (): Promise<Room<MyState>> => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          if (gameId() === null || gameId() === undefined)
            return await client.joinOrCreate<MyState>("game", params)
          else {
            try {
              return await client.joinById<MyState>(gameId(), params)
            } catch (e) {
              console.error(e, gameId, "inner try")

              return await client.create<MyState>("game", params)
            }
          }
        } catch (e) {
          console.error(e, gameId, "try")
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    const connectToGame = async () => {
      const connect = await tryConnect()

      const updateState = (state: MyState) => {
        const gameState = state.toJSON() as unknown as Game

        serialize(state, gameState)

        setGame(gameState)
        console.log(gameState, "onStateChange")
      }

      connect.onMessage("game", onMessage)
      connect.onStateChange((state) => updateState(state))
      connect.onError((code, message) => console.log(code, message, "onError"))
      connect.onLeave(async (code) => {
        console.log(code, "onLeave")

        if (code !== 4000) await connectToGame()
      })

      setGameId(connect.roomId)
      setRoom(connect)
      updateState(connect.state)

      setSearchParams({ tgWebAppStartParam: gameId() })
    }

    await connectToGame()
  }

  createEffect(() => {
    console.log(
      searchParams.tgWebAppStartParam,
      gameId(),
      room().connection?.isOpen,
      searchParams.tgWebAppStartParam !== gameId() || !room().connection?.isOpen
    )
    if (
      searchParams.tgWebAppStartParam !== gameId() ||
      !room().connection?.isOpen
    )
      connectToGame()
  })

  return (
    <GameContext.Provider value={{ game, room, player }}>
      {props.children}
    </GameContext.Provider>
  )
}
