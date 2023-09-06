import { For } from "solid-js"
import { PlayerDataClass } from "backend/src/typings/player"
import { Tag } from "~/components/map/tags/tag"
import { Droppable } from "~/components/map/tags/droppable"

interface TagsProps {
  battleMap: PlayerDataClass["battleMap"]
  fieldSize: number
  scale: number
  droppable: boolean
}

export function Tags(props: TagsProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <For each={props.battleMap}>
      {(item) => {
        return props.droppable ? (
          <Droppable id={`${item.x}x${item.y}`}>
            <Tag item={item} fieldSize={props.fieldSize} scale={props.scale} />
          </Droppable>
        ) : (
          <Tag item={item} fieldSize={props.fieldSize} scale={props.scale} />
        )
      }}
    </For>
  )
}
