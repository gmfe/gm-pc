import React, { ChangeEvent, KeyboardEvent } from 'react'
import _ from 'lodash'
import Dialog from './dialog'
import { PromptProps, PromptOptions } from './types'
import { getLocale } from '@gm-pc/locales'

const prompt = (props: PromptProps) => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }

  const {
    children,
    okBtnText,
    cancelBtnText,
    defaultValue,
    placeholder,
    onValidate,
  } = p as PromptOptions

  return new Promise((resolve, reject) => {
    // 用一个变量存即可
    let value: string = defaultValue || ''

    const handleOk = () => {
      let result: boolean | void
      if (onValidate) {
        result = onValidate(value)
      }

      // 阻止默认行为
      if (result === false) {
        return
      }

      resolve(value)
      Dialog.hide()
    }

    const child = (
      <div>
        <div>
          <input
            type='text'
            defaultValue={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              value = e.target.value
            }}
            placeholder={placeholder}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                handleOk()
              }
            }}
          />
        </div>
        {children}
      </div>
    )

    Dialog.render({
      children: child,
      buttons: [
        {
          text: cancelBtnText || getLocale('取消'),
          onClick() {
            reject(new Error('cancel'))
            Dialog.hide()
          },
        },
        {
          text: okBtnText || getLocale('确定'),
          btnType: 'primary',
          onClick: handleOk,
        },
      ],
    })
  })
}

export default prompt
