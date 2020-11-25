import _ from 'lodash'
import Dialog from './dialog'
import { ConfirmProps, DialogButtonProps } from './types'
import { getLocale } from '@gm-pc/locales'
import React, { FC, useState } from 'react'
import { Checkbox } from '@gm-pc/react/src/index'
import { Flex } from '../flex'
import { Button } from '../button'

interface InnerProps extends ConfirmProps {
  resolve: any
  reject: any
}

const Inner: FC<InnerProps> = ({
  children,
  okBtnText,
  okBtnType,
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
      text: okBtnText || getLocale('确定'),
      btnType: okBtnType || 'primary',
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
          <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
            {readText}
          </Checkbox>
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

const Confirm = (props: string | ConfirmProps): Promise<void> => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }

  const newProps = p as ConfirmProps
  const { children, okBtnText, cancelBtnText, read, ...rest } = newProps

  return new Promise((resolve, reject) => {
    Dialog.render({
      children: <Inner {...newProps} reject={reject} resolve={resolve} />,
      ...rest,
    })
  })
}

export default Confirm
