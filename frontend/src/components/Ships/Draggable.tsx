import { createDraggable } from "@thisbeyond/solid-dnd"
import { JSX, JSXElement } from "solid-js"
import { Ship } from "@components/Ships/Ship"

interface DraggableProps {
  data: Ship
  children: JSXElement
  style?: JSX.CSSProperties
}

export function Draggable(props: DraggableProps) {
  const draggable = createDraggable(
    `${props.data.length}x${props.data.x}`,
    props.data
  )
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div use:draggable class="draggable" style={props.style}>
      {props.children}
    </div>
  )
}
