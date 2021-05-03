import { createContext } from 'react'
import { FormInstance } from '../../common/hooks'
export interface ControlledFormContextProps
  extends Partial<Omit<FormInstance, 'apiDoValidate'>> {
  values?: { [key: string]: any }
  hideItems?: { [key: string]: boolean }
  onChange?(fieldName: string, originValue: any): any
}
export const ControlledFormContext = createContext<ControlledFormContextProps>({
  values: {},
  hideItems: {},
})
