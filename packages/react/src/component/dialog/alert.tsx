import _ from 'lodash'
import Dialog from './dialog'
import { AlertProps } from './types'
import { getLocale } from '@gm-pc/locales'

const Alert = (props: string | AlertProps): Promise<void> => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }

  const { okBtnText, children, ...rest } = p as AlertProps

  return new Promise((resolve, reject) => {
    Dialog.render({
      children,
      buttons: [
        {
          text: okBtnText || getLocale('确定'),
          btnType: 'primary',
          onClick() {
            resolve()
            Dialog.hide()
          },
        },
      ],
      onHide: () => {
        Dialog.hide()
        reject(new Error('cancel'))
      },
      ...rest,
    })
  })
}

export default Alert
