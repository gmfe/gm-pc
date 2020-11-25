import React, { FC } from 'react'
import { DialogProps, DialogStatic } from './types'
import { getLocale } from '@gm-pc/locales'
import _ from 'lodash'
import { Modal } from '../modal'
import { Button } from '../button'
import { Flex } from '../flex'
import EVENT_TYPE from '../../event_type'
import { LayoutRoot } from '../layout_root'

const Dialog: FC<DialogProps> & DialogStatic = ({
  title = getLocale('提示'),
  size = 'sm',
  buttons,
  children,
}) => {
  return (
    <Modal title={title} size={size} className='gm-dialog' disableMaskClose>
      <div>{children}</div>
      {buttons && (
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
      )}
    </Modal>
  )
}

Dialog.render = function (props: DialogProps): void {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_SHOW))
  LayoutRoot.setComponent(LayoutRoot.Type.MODAL, <Dialog {...props} />)
}

Dialog.hide = function (): void {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_HIDE))
  LayoutRoot.removeComponent(LayoutRoot.Type.MODAL)
}

// input key down

export default Dialog
