import { useSearchParams } from "@solidjs/router"
import { createEffect, createSignal } from "solid-js"
import { Game } from "~/typings/Game"
import { MyState } from "backend/src/typings/game"
import { Room } from "colyseus.js"

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [game, setGame] = createSignal<Game>({} as Game)
  const [room, setRoom] = createSignal<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = createSignal(searchParams.tgWebAppStartParam)

  console.log(searchParams.tgWebAppStartParam)

  createEffect(() => {})

  return <main />
}
