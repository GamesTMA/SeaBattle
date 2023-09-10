import { createEffect, createSignal, For, JSX, useContext } from "solid-js"
import { Tag } from "@components/Tags/Tag"
import { DimensionContext } from "@contexts/Dimension"
import { Droppable } from "@components/Tags/Droppable"
import { MessageInit } from "backend/src/typings/socket"
import { GameContext } from "@contexts/Game"

export interface TagsProps {
  battleMap: Tag[]
  droppable: boolean
  attackable: boolean
}

export function Tags(props: TagsProps) {
  const { room } = useContext(GameContext)
  const { fieldSize } = useContext(DimensionContext)
  const [battleMap, setBattleMap] = createSignal([] as TagsProps["battleMap"])

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
          <Droppable
            id={`${item.x}x${item.y}`}
            data={{ x: item.x, y: item.y }}
            style={item.style}
          >
            <Tag item={item} />
          </Droppable>
        ) : props.attackable ? (
          <div
            style={item.style}
            onClick={() =>
              room().send("game", {
                type: "makeFire",
                tag: item
              } as MessageInit)
            }
          >
            <Tag item={item} />
          </div>
        ) : (
          <div style={item.style}>
            <Tag item={item} />
          </div>
        )
      }}
    </For>
  )
}
