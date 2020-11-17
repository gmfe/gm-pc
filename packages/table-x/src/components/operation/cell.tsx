import React, { FC, HTMLAttributes } from 'react'

const OperationCell: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
)

export default OperationCell
