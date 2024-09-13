import React, { FC, useState } from 'react'
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
  onHide = () => Dialog.hide(),
  children,
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <Modal
      title={title}
      size={size}
      className='gm-dialog'
      disableMaskClose
      onHide={onHide}
    >
      <div>{children}</div>
      {buttons && (
        <Flex justifyEnd className='gm-dialog-buttons gm-margin-top-10'>
          {_.map(buttons, (btn) => {
            const isPrimary = btn.btnType === 'primary' || btn.btnType === 'danger'

            return (
              <Button
                loading={btn.loading || (isPrimary && loading)}
                key={btn.text}
                type={btn.btnType}
                disabled={btn.disabled}
                onClick={() => {
                  setLoading(true)
                  // console.log('btn.onClick', btn.onClick())
                  Promise.resolve(btn.onClick()).finally(() => {
                    setLoading(false)
                  })
                }}
                className='gm-margin-left-10'
              >
                {btn.text}
              </Button>
            )
          })}
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
