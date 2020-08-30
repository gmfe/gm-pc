import React, { CSSProperties, FC, useContext } from 'react'
import { FormButtonProps } from './types'
import FormContext from './context'

const FormButton: FC<FormButtonProps> = ({ labelWidth, btnPosition, children }) => {
  const context = useContext(FormContext)
  labelWidth = labelWidth ?? context.labelWidth
  btnPosition = btnPosition ?? context.btnPosition
  const { inline } = context
  const style: CSSProperties = {
    marginLeft: btnPosition === 'left' && !inline && labelWidth ? labelWidth : 0,
  }
  const position = `gm-text-${btnPosition}`

  return (
    <div style={style} className={position}>
      {children}
    </div>
  )
}

export default FormButton
