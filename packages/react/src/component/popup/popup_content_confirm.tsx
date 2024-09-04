import React, { HTMLAttributes, CSSProperties, FC, useState } from 'react'
import classNames from 'classnames'
import SVGRemove from '../../svg/remove.svg'
import { Button, ButtonType } from '../button'
import { getLocale } from '@gm-pc/locales'
import _ from 'lodash'
import { Checkbox } from '@gm-pc/react/src'

type PopupContentConfirmType = 'save' | 'delete'

type ButtonMap = {
  [key in PopupContentConfirmType]: {
    type: ButtonType
    text: string
    onClick(): void
    disabled?: boolean
    loading?: boolean
  }
}

export interface PopupContentConfirmProps extends HTMLAttributes<HTMLDivElement> {
  type: PopupContentConfirmType
  title?: string
  onCancel(): void
  onDelete?(): void
  onSave?(): void
  /** 阅读提示, type delete 用 */
  read?: boolean | string
  className?: string
  style?: CSSProperties
  loading?: boolean
}

const PopupContentConfirm: FC<PopupContentConfirmProps> = ({
  title,
  type = 'save',
  onCancel,
  onDelete,
  onSave,
  read,
  className,
  children,
  loading,
  ...rest
}) => {
  const [checked, setChecked] = useState<boolean>(false)

  const readText = _.isString(read) ? read : getLocale('我已阅读以上提示，确认删除')

  const buttonMap: ButtonMap = {
    save: {
      text: getLocale('保存'),
      type: 'primary',
      onClick() {
        onSave && onSave()
      },
      loading: loading,
    },
    delete: {
      text: getLocale('删除'),
      type: 'danger',
      onClick() {
        onDelete && onDelete()
      },
      loading: loading,
      disabled: read ? !checked : false,
    },
  }

  return (
    <div {...rest} className={classNames('gm-popup-content-confirm', className)}>
      <div className='gm-popup-content-confirm-title-wrap'>
        <div className='gm-popup-content-confirm-title'>{title}</div>
        <div className='gm-popup-content-confirm-close' onClick={onCancel}>
          <SVGRemove />
        </div>
      </div>
      <div className='gm-popup-content-confirm-content'>
        {children}
        {read && (
          <div className='gm-margin-top-20'>
            <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
              {readText}
            </Checkbox>
          </div>
        )}
        <div className='gm-popup-content-confirm-button'>
          <Button className='gm-margin-right-10' onClick={onCancel}>
            {getLocale('取消')}
          </Button>
          <Button
            type={buttonMap[type].type}
            onClick={() => {
              buttonMap[type].onClick()
            }}
            loading={loading}
            disabled={buttonMap[type].disabled}
          >
            {buttonMap[type].text}
          </Button>
        </div>
      </div>
    </div>
  )
}
export default PopupContentConfirm
