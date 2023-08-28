import { For } from "solid-js"
import { PlayerDataClass } from "backend/src/typings/player"

interface TagsProps {
  battleMap: PlayerDataClass["battleMap"]
  fieldSize: number
  scale: number
}

export function Tags(props: TagsProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <For each={props.battleMap}>
      {(item) => {
        return (
          <div
            style={{
              "background-image": `url('/sprite.png')`,
              "background-position": `${
                (item.miss || item.marked ? 330 : 363) * -props.scale
              }px ${
                (item.miss || item.hit ? 0 : item.marked ? 33 : 66) *
                -props.scale
              }px`,
              "background-size": `${props.scale * 396}px ${props.scale * 99}px`,
              "background-repeat": "no-repeat",
              width: `${props.fieldSize}px`,
              height: `${props.fieldSize}px`,
              position: "absolute",
              left: `${(item.x + 1) * props.fieldSize}px`,
              top: `${(item.y + 1) * props.fieldSize}px`
            }}
          />
        )
      }}
    </For>
  )
}
