import { JSX, useContext } from "solid-js"
import { DimensionContext } from "@contexts/Dimension"

export interface Field {
  x: number
  y: number
  hit?: boolean
  miss?: boolean
  marked?: boolean
  style?: JSX.CSSProperties
}

export interface FieldProps {
  item: Field
}

export function Field(props: FieldProps) {
  const { scale } = useContext(DimensionContext)

  return (
    <>
      {!props.item.marked && !props.item.hit && !props.item.miss ? (
        <div />
      ) : (
        <div
          style={{
            "background-image": `url('/sprite.png')`,
            "background-position": `${
              (props.item.miss || props.item.marked ? 330 : 363) * -scale()
            }px ${
              (props.item.miss || props.item.hit
                ? 0
                : props.item.marked
                ? 33
                : 66) * -scale()
            }px`,
            "background-size": `${scale() * 396}px ${scale() * 99}px`,
            "background-repeat": "no-repeat",
            width: "100%",
            height: "100%"
          }}
        />
      )}
    </>
  )
}
