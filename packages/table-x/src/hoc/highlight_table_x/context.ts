import { createContext, useContext } from 'react'

export interface HighlightTableXContext {
  highlight: any
  setHighlight(highlight: any): void
}

export const HighlightTableXContext = createContext<HighlightTableXContext>({
  highlight: undefined,
  setHighlight: () => {},
})

export const useHighlightTableXContext = () => useContext(HighlightTableXContext)

export default HighlightTableXContext
