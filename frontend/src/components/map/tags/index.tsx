import { createEffect, createSignal, For, JSX, useContext } from "solid-js"
import { Tag } from "~/components/map/tags/tag"
import { Droppable } from "~/components/map/tags/droppable"
import { DimensionContext } from "~/contexts/Dimension"

interface TagsProps {
  battleMap: Tag[]
  droppable: boolean
}

export function Tags(props: TagsProps) {
  const { fieldSize } = useContext(DimensionContext)
  const [battleMap, setBattleMap] = createSignal([] as Tag[])
  createEffect(() => {
    if (fieldSize())
      setBattleMap(
        props.battleMap.map((item) => ({
          ...item,
          style: {
            width: `${fieldSize()}px`,
            height: `${fieldSize()}px`,
            position: "absolute",
            left: `${(item.x + 1) * fieldSize()}px`,
            top: `${(item.y + 1) * fieldSize()}px`
          } as JSX.CSSProperties
        }))
      )
  })
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <For each={battleMap()}>
      {(item) => {
        return props.droppable ? (
          <Droppable id={`${item.x}x${item.y}`} style={item.style}>
            <Tag item={item} />
          </Droppable>
        ) : (
          <div style={item.style}>
            <Tag item={item} />
          </div>
        )
      }}
    </For>
  )
}
