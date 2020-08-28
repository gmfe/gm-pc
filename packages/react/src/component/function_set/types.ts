interface FunctionSetData {
  text: string
  onClick?(): void
  show?: boolean
  disabled?: boolean
  children?: FunctionSetData[]
}

interface FunctionSetProps {
  data: FunctionSetData[]
  right?: boolean
  disabled?: boolean
}

export type { FunctionSetData, FunctionSetProps }
