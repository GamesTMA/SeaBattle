import { createDraggable } from "@thisbeyond/solid-dnd"
import { JSX, JSXElement } from "solid-js"

interface DraggableProps {
  id: string
  children: JSXElement
  style?: JSX.CSSProperties
}

export function Draggable(props: DraggableProps) {
  const draggable = createDraggable(props.id)

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div use:draggable class="draggable" style={props.style}>
      {props.children}
    </div>
  )
}
