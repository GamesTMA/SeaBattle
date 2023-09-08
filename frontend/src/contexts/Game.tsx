import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  ParentProps
} from "solid-js"
import { Game } from "~/typings/Game"
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
}

const client = new Colyseus.Client(process.env.NEXT_PUBLIC_WEB_SOCKETS)

export const GameContext = createContext({} as GameProps)

export function GameProvider(props: ParentProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [game, setGame] = createSignal<Game>({} as Game)
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
      return

    const player = {
      id: inputData.user.id,
      name: inputData.user.firstName,
      language: inputData.user.languageCode
    }
    const params = {
      player,
      id: gameId()
    }

    const maxAttempts = 15
    const delay = 1000
    const tryConnect = async (): Promise<Room<MyState> | null> => {
      let attempts = 0

      while (attempts < maxAttempts) {
        try {
          if (gameId === null) {
            return await client.joinOrCreate<MyState>("game", params)
          } else {
            try {
              return await client.joinById<MyState>(gameId(), params)
            } catch (e) {
              return await client.create<MyState>("game", params)
            }
          }
        } catch (e) {
          console.error(e, gameId)
          attempts++

          if (attempts >= maxAttempts) return null

          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }

      return null
    }

    const connectToGame = async () => {
      const connect = await tryConnect()

      if (connect === null) return

      const updateState = (state: MyState) => {
        const gameState = state.toJSON() as unknown as Game

        serialize(state, gameState)

        setGame(gameState)
        console.log(gameState, "onStateChange")
      }

      connect.onMessage("game", onMessage)
      connect.onStateChange((state) => updateState(state))
      connect.onError((code, message) => {
        console.log(code, message, "onError")
      })
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
    if (
      searchParams.tgWebAppStartParam !== gameId() ||
      !room().connection?.isOpen
    )
      connectToGame()
  })

  return (
    <GameContext.Provider value={{ game, room }}>
      {props.children}
    </GameContext.Provider>
  )
}
