import React, { FC, HTMLAttributes, useMemo, useRef, useState } from 'react'
import { Popover, PopupContentConfirm } from '@gm-pc/react'
import { getLocale } from '@gm-pc/locales'
import OperationIcon from './icon'
import SVGDelete from '../../svg/delete.svg'

interface OperationDeleteProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  onClick(): void
  tip?: string
  /** 阅读提示, type delete 用 */
  read?: boolean | string
  disabled?: boolean
}

const OperationDelete: FC<OperationDeleteProps> = ({
  title,
  onClick,
  tip = getLocale('删除'),
  read,
  disabled,
  children,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    handleCancel()
    try {
      setLoading(true)
      const res = await onClick?.()
      return res
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = (): void => {
    popoverRef.current!.apiDoSetActive()
  }

  const popup = () => (
    <PopupContentConfirm
      type='delete'
      title={title}
      read={read}
      onCancel={handleCancel}
      onDelete={handleDelete}
      loading={loading}
    >
      {children ?? getLocale('确定删除？')}
    </PopupContentConfirm>
  )

  return (
    <Popover popup={popup} ref={popoverRef} right showArrow>
      <OperationIcon {...rest} tip={tip} disabled={disabled}>
        <SVGDelete />
      </OperationIcon>
    </Popover>
  )
}

export default OperationDelete
