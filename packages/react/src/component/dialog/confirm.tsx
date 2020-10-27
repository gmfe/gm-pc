import _ from 'lodash'
import Dialog from './dialog'
import { ConfirmProps } from './types'
import { getLocale } from '@gm-pc/locales'

const Confirm = (props: string | ConfirmProps): Promise<void> => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }
  const { children, okBtnText, cancelBtnText, ...rest } = p as ConfirmProps

  return new Promise((resolve, reject) => {
    Dialog.render({
      children,
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
          onClick() {
            resolve()
            Dialog.hide()
          },
        },
      ],
      ...rest,
    })
  })
}

export default Confirm
