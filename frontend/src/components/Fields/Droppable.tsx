import { createDroppable } from "@thisbeyond/solid-dnd"
import { JSX, JSXElement } from "solid-js"

interface DraggableProps {
  id: string
  data: object
  children: JSXElement
  style?: JSX.CSSProperties
}

export function Droppable(props: DraggableProps) {
  const droppable = createDroppable(props.id, props.data)
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div use:droppable class="droppable" style={props.style}>
      {props.children}
    </div>
  )
}
