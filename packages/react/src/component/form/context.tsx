import { createContext } from 'react'
import { FormBtnPosition } from './types'

export interface FormContextOptions {
  labelWidth?: string
  disabledCol?: boolean
  inline?: boolean
  btnPosition?: FormBtnPosition
  colWidth?: string
  canValidate?: boolean
}

const FormContext = createContext<Readonly<FormContextOptions>>({})

export default FormContext
