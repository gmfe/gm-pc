import React, { Children, CSSProperties, FC, useContext } from 'react'
import classNames from 'classnames'
import FormContext from './context'
import { Flex } from '../flex'
import { FormBlockProps } from './types'

const FormBlock: FC<FormBlockProps> = ({
  col = 1,
  disabledCol,
  inline,
  className,
  style,
  children,
}) => {
  const context = useContext(FormContext)
  disabledCol = disabledCol ?? context.disabledCol
  inline = inline ?? context.inline
  const { colWidth } = context
  const _cw = +colWidth!.replace('px', '')
  const _style: CSSProperties = Object.assign(
    {},
    style,
    disabledCol || inline ? {} : { width: _cw * col }
  )

  return (
    <Flex wrap style={_style} className={classNames('gm-form-block', className)}>
      {Children.map(children, (child, index) => (
        <Flex key={index} column>
          {child}
        </Flex>
      ))}
    </Flex>
  )
}

FormBlock.displayName = 'FormBlock'

export default FormBlock
