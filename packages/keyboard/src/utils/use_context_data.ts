import { useContext } from 'react'
import { WrapContext, CellKeyContext } from './context'
import { KeyboardWrapData } from '../types'

function useContextData() {
  const wrapData: KeyboardWrapData = JSON.parse(useContext(WrapContext))
  const cellKey = useContext(CellKeyContext)

  return { wrapData, cellKey }
}

export default useContextData
