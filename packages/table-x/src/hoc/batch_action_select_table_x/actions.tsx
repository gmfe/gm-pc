import React, { FC } from 'react'
import SVGDelete from '../../svg/delete.svg'
import SVGEdit from '../../svg/edit-pen.svg'
import SVGBusiness from '../../svg/business.svg'

const BatchActionDelete: FC = ({ children, ...rest }) => {
  return (
    <span {...rest}>
      <SVGDelete className='gm-margin-right-5' />
      {children}
    </span>
  )
}

const BatchActionEdit: FC = ({ children, ...rest }) => {
  return (
    <span {...rest}>
      <SVGEdit className='gm-margin-right-5' />
      {children}
    </span>
  )
}

const BatchActionDefault: FC = ({ children, ...rest }) => {
  return (
    <span {...rest}>
      <SVGBusiness className='gm-margin-right-5' />
      {children}
    </span>
  )
}

export { BatchActionDefault, BatchActionDelete, BatchActionEdit }
