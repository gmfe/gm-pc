import _ from 'lodash'
import Dialog from './dialog'
import { ConfirmProps, ConfirmOptions } from './types'
import { getLocale } from '@gm-pc/locales'

const Confirm = (props: ConfirmProps): Promise<void> => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }
  const { children, okBtnText, cancelBtnText } = p as ConfirmOptions

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
    })
  })
}

export default Confirm
