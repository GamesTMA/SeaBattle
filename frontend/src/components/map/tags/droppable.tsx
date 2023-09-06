import { createDroppable } from "@thisbeyond/solid-dnd"
import { JSXElement } from "solid-js"

export interface DraggableProps {
  id: string
  children: JSXElement
}

export function Droppable(props: DraggableProps) {
  const droppable = createDroppable(props.id)

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div use:droppable class="droppable">
      {props.children}
    </div>
  )
}
