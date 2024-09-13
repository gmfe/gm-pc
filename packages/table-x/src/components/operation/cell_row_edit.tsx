import React, { FC } from 'react'
import { Button } from '@gm-pc/react'
import { getLocale } from '@gm-pc/locales'
import OperationCell from './cell'
import OperationIcon from './icon'
import SVGPen from '../../svg/pen.svg'

interface OperationCellRowEditProps {
  isEditing: boolean
  onClick?(): void
  onSave?(): void
  onCancel?(): void
  disabled?: boolean
  loading?: boolean
}

const OperationCellRowEdit: FC<OperationCellRowEditProps> = ({
  children,
  isEditing,
  onClick,
  onSave,
  onCancel,
  disabled,
  loading,
}) => {
  const handleClick = (): void => {
    if (disabled) return
    onClick && onClick()
  }

  const handleSave = () => {
    return onSave?.()
  }

  const handleCancel = (): void => {
    onCancel && onCancel()
  }

  return isEditing ? (
    <OperationCell>
      <Button size='small' type='primary' loading={loading} onClick={handleSave}>
        {getLocale('保存')}
      </Button>
      <span className='gm-gap-5' />
      <Button size='small' type='default' onClick={handleCancel}>
        {getLocale('取消')}
      </Button>
    </OperationCell>
  ) : (
    <OperationCell>
      <OperationIcon onClick={handleClick} tip={getLocale('编辑')} disabled={disabled}>
        <SVGPen />
      </OperationIcon>
      {children}
    </OperationCell>
  )
}

export default OperationCellRowEdit
