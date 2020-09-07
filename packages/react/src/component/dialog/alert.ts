import _ from 'lodash'
import Dialog from './dialog'
import { AlertOptions, AlertProps } from './types'
import { getLocale } from '@gm-pc/locales'

const Alert = (props: AlertProps): Promise<void> => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }

  const { okBtnText, children, ...rest } = p as AlertOptions

  return new Promise((resolve) => {
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
      ...rest,
    })
  })
}

export default Alert
