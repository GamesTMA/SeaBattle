import { NotStarted } from "@components/NotStarted"
import { DimensionProvider } from "@contexts/Dimension"
import { createMemo, Show, useContext } from "solid-js"
import { GameContext } from "@contexts/Game"
import Loading from "@components/Loading"
import { Started } from "@components/Started"

export default function Home() {
  const { game, player } = useContext(GameContext)

  const thisPlayer = createMemo(() => game().players?.get(String(player().id)))
  const opponent = createMemo(() => game().players?.get(String(player().id)))
  return (
    <main style={{ "padding-top": "10px" }}>
      <DimensionProvider>
        <Show when={thisPlayer() !== undefined} fallback={<Loading />}>
          {game().status === "playing" ? (
            <Started thisPlayer={thisPlayer()!} opponent={opponent()!} />
          ) : (
            <NotStarted
              battleMap={thisPlayer()!.battleMap}
              ships={thisPlayer()!.ships}
            />
          )}
        </Show>
      </DimensionProvider>
    </main>
  )
}
