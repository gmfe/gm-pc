import React, { FC, MouseEvent, useEffect, useRef, isValidElement } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { ModalProps, ModalStatic } from './types'
import EVENT_TYPE from '../../event_type'
import { LayoutRoot, Type } from '../layout_root'
import SVGRemove from '../../svg/remove.svg'

const Modal: FC<ModalProps> & ModalStatic = ({
  title,
  size = 'md',
  disableMaskClose,
  noContentPadding,
  noCloseBtn,
  opacityMask,
  onHide,
  children,
  className,
  containerClassName,
  style,
}) => {
  const refModal = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const doScroll = (): void => {
      window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_SCROLL))
    }

    const handleKeydown = (event: KeyboardEvent): void => {
      if (event.keyCode === 27) {
        onHide && onHide()
      }
    }

    window.document.body.addEventListener('keydown', handleKeydown)

    refModal.current &&
      refModal.current.addEventListener('scroll', _.throttle(doScroll, 200))

    return () => {
      window.document.body.removeEventListener('keydown', handleKeydown)
      refModal.current && refModal.current.removeEventListener('scroll', doScroll)
    }
  }, [onHide])

  const handleClose = (): void => {
    onHide && onHide()
  }

  const handleMask = (event: MouseEvent<HTMLDivElement>): void => {
    if (
      !disableMaskClose &&
      (event.target as HTMLDivElement).classList.contains('gm-modal-wrap')
    ) {
      handleClose()
    }
  }

  // 拿出来，更直观点
  const dialog = (
    <div
      className={classNames(
        'gm-modal',
        'gm-modal-' + size,
        {
          'gm-modal-mask-opacity': opacityMask,
          'gm-modal-has-title': title,
        },
        className
      )}
      style={style}
    >
      {title && (
        <div className='gm-modal-title-wrap'>
          {isValidElement(title) ? title : <div className='gm-modal-title'>{title}</div>}
        </div>
      )}
      {noCloseBtn || (
        <div className='gm-modal-close gm-cursor' onClick={handleClose}>
          <SVGRemove />
        </div>
      )}
      <div
        className={classNames('gm-modal-content', {
          'gm-padding-0': noContentPadding,
        })}
      >
        {children}
      </div>
    </div>
  )

  return (
    <div className={classNames('gm-modal-container', containerClassName)}>
      <div
        className={classNames('gm-modal-mask', {
          'gm-modal-mask-opacity': opacityMask,
        })}
      />
      <div ref={refModal} className='gm-modal-wrap' tabIndex={-1} onClick={handleMask}>
        {dialog}
      </div>
    </div>
  )
}

// 做warning用
let closeFlag = false

Modal._render = function (props: ModalProps, type?: Type): void {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_SHOW))
  const { onHide, ...rest } = props

  function handleHide(): void {
    closeFlag = false
    onHide && onHide()
    if (!closeFlag) {
      console.warn('请在 onHide 里调用 Modal.hide。这次帮你hide')
      Modal._hide(type || LayoutRoot.Type.MODAL)
    }
  }

  LayoutRoot.setComponent(
    type || LayoutRoot.Type.MODAL,
    <Modal onHide={handleHide} {...rest} />
  )
}

Modal._hide = function (type?: Type): void {
  closeFlag = true

  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_HIDE))
  LayoutRoot.removeComponent(type || LayoutRoot.Type.MODAL)
}

Modal.render = function (props: ModalProps) {
  Modal._render(props)
}

Modal.hide = function () {
  Modal._hide()
}

export default Modal
export type { ModalProps }
