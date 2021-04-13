import { createContext } from 'react'

export interface ControlledFormContextProps {
  values?: { [key: string]: any }
  hideItems?: { [key: string]: boolean }
  onChange?(fieldName: string, originValue: any): void
}
export const ControlledFormContext = createContext<ControlledFormContextProps>({
  values: {},
  hideItems: {},
})
