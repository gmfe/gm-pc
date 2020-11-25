import _ from 'lodash'
import { DeleteProps } from './types'
import { getLocale } from '@gm-pc/locales'
import Confirm from './confirm'

const DeleteCom = (props: string | DeleteProps): Promise<void> => {
  let p = props
  if (!_.isObject(props)) {
    p = {
      children: props,
    }
  }

  const newProps = p as DeleteProps

  return Confirm(
    Object.assign(
      {
        okBtnText: getLocale('删除'),
        okBtnType: 'danger',
      },
      newProps
    )
  )
}

export default DeleteCom
