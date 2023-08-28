import { useSearchParams } from "@solidjs/router"
import { createSignal, onCleanup, onMount } from "solid-js"
import { MyState } from "backend/src/typings/game"
import { Room } from "colyseus.js"
import { BattleMap } from "~/components/map"
import { Game } from "~/typings/Game"

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [game, setGame] = createSignal<Game>({} as Game)
  const [room, setRoom] = createSignal<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = createSignal(searchParams.tgWebAppStartParam)

  const [size, setSize] = createSignal(0)
  const handlerSize = () => {
    setSize(
      window.innerWidth * 0.9 > (window.innerHeight * 0.9) / 2
        ? (window.innerHeight * 0.9) / 2
        : window.innerWidth * 0.9
    )
  }
  onMount(() => {
    handlerSize()
    window.addEventListener("resize", handlerSize)
  })
  onCleanup(() => window.removeEventListener("resize", handlerSize))
  const battleMap = [
    { x: 0, y: 0, miss: true },
    { x: 1, y: 0, hit: true },
    { x: 2, y: 0, marked: true }
  ]

  const ships = [
    { x: 0, y: 0, length: 1, direction: "right" },
    { x: 3, y: 0, length: 2, direction: "bottom" },
    { x: 5, y: 0, length: 3, direction: "right" }
  ]

  return (
    <main>
      <BattleMap size={size} battleMap={battleMap} ships={ships} />
    </main>
  )
}
