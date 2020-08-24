import React, { FC } from 'react'
import classNames from 'classnames'
import { RowProps } from './types'
import { RowContext } from './util'
import Flex from '../flex'

const Row: FC<RowProps> = ({ gutter = 0, className, style, children, ...rest }) => {
  const rowStyle = style || {}
  if (typeof gutter === 'number' && gutter > 0) {
    rowStyle.marginLeft = -gutter / 2
    rowStyle.marginRight = -gutter / 2
  }

  return (
    <Flex
      row
      wrap
      {...rest}
      className={classNames('gm-grid-row', className)}
      style={rowStyle}
    >
      <RowContext.Provider value={{ gutter }}>{children}</RowContext.Provider>
    </Flex>
  )
}

export default Row
