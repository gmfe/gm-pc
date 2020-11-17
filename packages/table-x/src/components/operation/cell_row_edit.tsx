import React, { FC } from 'react'
import { Button } from '@gm-pc/react'
import { getLocale } from '@gm-pc/locales'
import OperationCell from './cell'
import OperationIconTip from './icon_tip'
import SVGPen from '../../svg/pen.svg'

interface OperationCellRowEditProps {
  isEditing: boolean
  onClick?(): void
  onSave?(): void
  onCancel?(): void
}

const OperationCellRowEdit: FC<OperationCellRowEditProps> = ({
  children,
  isEditing,
  onClick,
  onSave,
  onCancel,
}) => {
  const handleClick = (): void => {
    onClick && onClick()
  }

  const handleSave = (): void => {
    onSave && onSave()
  }

  const handleCancel = (): void => {
    onCancel && onCancel()
  }

  return isEditing ? (
    <OperationCell>
      <Button size='small' type='primary' onClick={handleSave}>
        {getLocale('保存')}
      </Button>
      <span className='gm-gap-5' />
      <Button size='small' type='default' onClick={handleCancel}>
        {getLocale('取消')}
      </Button>
    </OperationCell>
  ) : (
    <OperationCell>
      <OperationIconTip tip={getLocale('编辑')}>
        <span className='gm-padding-5'>
          <SVGPen
            className='gm-inline-block gm-cursor gm-text-14 gm-text gm-text-hover-primary'
            onClick={handleClick}
          />
        </span>
      </OperationIconTip>
      {children}
    </OperationCell>
  )
}

export default OperationCellRowEdit
