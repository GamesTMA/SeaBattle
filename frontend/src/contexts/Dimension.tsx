import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSXElement,
  onCleanup,
  onMount
} from "solid-js"

const defaultFieldSize = 33

interface DimensionContextProps {
  size: Accessor<number>
  scale: Accessor<number>
  fieldSize: Accessor<number>
}

export const DimensionContext = createContext({} as DimensionContextProps)

interface DimensionProps {
  children: JSXElement
}

export function DimensionProvider(props: DimensionProps) {
  const [size, setSize] = createSignal(0)
  const [fieldSize, setFieldSize] = createSignal(defaultFieldSize)
  const [scale, setScale] = createSignal(1)

  const handlerSize = () => {
    setSize(
      window.innerWidth * 0.9 > (window.innerHeight * 0.9) / 2
        ? (window.innerHeight * 0.9) / 2
        : window.innerWidth * 0.9
    )
  }
  onMount(() => {
    handlerSize()
    window.addEventListener("resize", handlerSize)
  })
  onCleanup(() => window.removeEventListener("resize", handlerSize))

  createEffect(() => {
    setFieldSize(size() / 11)
    setScale(fieldSize() / defaultFieldSize)
  })

  return (
    <DimensionContext.Provider value={{ size, fieldSize, scale }}>
      {props.children}
    </DimensionContext.Provider>
  )
}
