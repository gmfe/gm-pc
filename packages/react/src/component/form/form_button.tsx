import React, { CSSProperties, FC, useContext } from 'react'
import { FormButtonProps } from './types'
import FormContext from './context'
import { Flex } from '../flex'

const FormButton: FC<FormButtonProps> = ({ labelWidth, btnPosition, children }) => {
  const context = useContext(FormContext)
  labelWidth = labelWidth ?? context.labelWidth
  btnPosition = btnPosition ?? context.btnPosition
  const { inline } = context
  const style: CSSProperties = {
    marginLeft: btnPosition === 'left' && !inline && labelWidth ? labelWidth : 0,
  }

  return (
    <Flex
      column
      alignStart={btnPosition === 'left'}
      alignCenter={btnPosition === 'center'}
      alignEnd={btnPosition === 'right'}
      style={style}
    >
      <div>{children}</div>
    </Flex>
  )
}

export default FormButton
