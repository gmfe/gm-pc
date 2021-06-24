import _ from 'lodash'
import { ReactNode, createContext } from 'react'

import { FormInstance } from '../../common/hooks'
export interface ControlledFormContextProps
  extends Partial<Omit<FormInstance, 'apiDoValidate'>> {
  values?: { [key: string]: any }
  hideItems?: { [key: string]: boolean }
  onChange?(fieldName: string, originValue: any): any
  setCanSubmit(key: string, message: ReactNode): void
  didClickSubmit: boolean
}
export const ControlledFormContext = createContext<ControlledFormContextProps>({
  values: {},
  hideItems: {},
  setCanSubmit: _.noop,
  didClickSubmit: false,
})
