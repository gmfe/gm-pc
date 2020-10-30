import React, { FC, useState } from 'react'
import _ from 'lodash'
import Dialog from './dialog'
import { DeleteProps, DialogButtonProps } from './types'
import { getLocale } from '@gm-pc/locales'
import { Radio } from '@gm-pc/react'
import { Flex } from '../flex'
import { Button } from '../button'

interface InnerProps extends DeleteProps {
  resolve: any
  reject: any
}

const Inner: FC<InnerProps> = ({
  children,
  okBtnText,
  cancelBtnText,
  read,
  resolve,
  reject,
}) => {
  const [checked, setChecked] = useState<boolean>(false)

  const readText = _.isString(read) ? read : getLocale('我已阅读以上提示，确认删除')

  const buttons: DialogButtonProps[] = [
    {
      text: cancelBtnText || getLocale('取消'),
      btnType: 'default',
      onClick() {
        reject(new Error('cancel'))
        Dialog.hide()
      },
    },
    {
      text: okBtnText || getLocale('删除'),
      btnType: 'danger',
      onClick() {
        resolve()
        Dialog.hide()
      },
      disabled: read ? !checked : false,
    },
  ]

  return (
    <div>
      {children}
      {read && (
        <div className='gm-margin-top-20'>
          <Radio checked={checked} onChange={() => setChecked(!checked)}>
            {readText}
          </Radio>
        </div>
      )}
      <Flex justifyEnd className='gm-dialog-buttons gm-margin-top-10'>
        {_.map(buttons, (btn) => (
          <Button
            key={btn.text}
            type={btn.btnType}
            disabled={btn.disabled}
            onClick={() => {
              btn.onClick()
            }}
            className='gm-margin-left-10'
          >
            {btn.text}
          </Button>
        ))}
      </Flex>
    </div>
  )
}

const DeleteCom = (props: string | DeleteProps): Promise<void> => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }
  const { children, okBtnText, cancelBtnText, read, ...rest } = p as DeleteProps

  return new Promise((resolve, reject) => {
    Dialog.render({
      children: <Inner {...(p as DeleteProps)} reject={reject} resolve={resolve} />,
      ...rest,
    })
  })
}

export default DeleteCom
