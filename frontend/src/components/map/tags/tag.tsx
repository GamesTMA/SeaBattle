export interface Tag {
  x: number
  y: number
  hit?: boolean
  miss?: boolean
  marked?: boolean
}

export interface TagProps {
  item: Tag
  fieldSize: number
  scale: number
}

export function Tag(props: TagProps) {
  return (
    <div
      style={{
        "background-image": `url('/sprite.png')`,
        "background-position": `${
          (props.item.miss || props.item.marked ? 330 : 363) * -props.scale
        }px ${
          (props.item.miss || props.item.hit
            ? 0
            : props.item.marked
            ? 33
            : 66) * -props.scale
        }px`,
        "background-size": `${props.scale * 396}px ${props.scale * 99}px`,
        "background-repeat": "no-repeat",
        width: `${props.fieldSize}px`,
        height: `${props.fieldSize}px`,
        position: "absolute",
        left: `${(props.item.x + 1) * props.fieldSize}px`,
        top: `${(props.item.y + 1) * props.fieldSize}px`
      }}
    />
  )
}
