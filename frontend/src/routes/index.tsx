import { ShipsProps } from "~/components/ships"
import { NotStarted } from "~/components/NotStarted"
import { DimensionProvider } from "~/contexts/Dimension"
import { TagsProps } from "~/components/map/tags"

export default function Home() {
  const battleMap = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5, miss: true },
    { x: 6, y: 6 },
    { x: 7, y: 7 },
    { x: 8, y: 8 },
    { x: 9, y: 9 }
  ] as TagsProps["battleMap"]
  const ships = [
    { x: 0, y: 0, length: 2, direction: "horizontal" }
  ] as ShipsProps["ships"]

  return (
    <main>
      <DimensionProvider>
        <NotStarted battleMap={battleMap} ships={ships} />
      </DimensionProvider>
    </main>
  )
}
