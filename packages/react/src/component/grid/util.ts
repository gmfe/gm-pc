import { createContext } from 'react'
import { Gutter } from './types'

interface RowContext {
  gutter?: Gutter
}

const RowContext = createContext<RowContext>({
  gutter: undefined,
})

export { RowContext }
