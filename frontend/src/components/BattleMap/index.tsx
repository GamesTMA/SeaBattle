import { useContext } from "solid-js"
import { Fields, FieldsProps } from "src/components/Fields"
import { Ships, ShipsProps } from "@components/Ships"
import { DimensionContext } from "@contexts/Dimension"

export interface BattleMapProps {
  battleMap: FieldsProps["battleMap"]
  ships: ShipsProps["ships"]
  droppable: boolean
  attackable: boolean
}

export function BattleMap(props: BattleMapProps) {
  const { fieldSize, size } = useContext(DimensionContext)

  return (
    <figure
      style={{
        width: `${size() + fieldSize()}px`,
        height: `${size() + fieldSize()}px`,
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto"
      }}
    >
      <div
        style={{
          "background-image": `url('/grid.png')`,
          "background-size": `${fieldSize()}px ${fieldSize()}px`,
          width: "100%",
          height: "100%",
          position: "absolute"
        }}
      />
      <div
        style={{
          "background-image": `url('/map.png')`,
          "background-size": `${size() + fieldSize()}px ${
            size() + fieldSize()
          }px`,
          width: "100%",
          height: "100%",
          position: "absolute",
          "background-repeat": "no-repeat"
        }}
      />
      <Fields
        battleMap={props.battleMap}
        droppable={props.droppable}
        attackable={props.attackable}
      />
      <Ships
        ships={props.ships}
        draggable={false}
        droppable={props.droppable}
      />
    </figure>
  )
}
