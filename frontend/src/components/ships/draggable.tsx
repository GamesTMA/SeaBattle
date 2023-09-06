import { createDraggable } from "@thisbeyond/solid-dnd"
import { JSXElement } from "solid-js"

export interface DraggableProps {
  id: string
  children: JSXElement
}

export function Draggable(props: DraggableProps) {
  const draggable = createDraggable(props.id)

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div use:draggable class="draggable">
      {props.children}
    </div>
  )
}
