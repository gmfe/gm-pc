import React, { FC, PropsWithChildren } from 'react'
import Loading from './loading'
import { LayoutRoot } from '../layout_root'
import { Flex } from '../flex'
import EVENT_TYPE from '../../event_type'
import { LoadingFullScreenProps, LoadingFullScreenStatic } from './type'

const LoadingFullScreen: FC<LoadingFullScreenProps> & LoadingFullScreenStatic = ({
  text,
  size = '40px',
}) => {
  return (
    <Flex alignCenter justifyCenter className='gm-loading-full-screen'>
      <Flex column alignCenter>
        <Loading size={size} />
        {text && <span className='gm-loading-text'>{text}</span>}
      </Flex>
    </Flex>
  )
}

LoadingFullScreen.render = function (
  props: PropsWithChildren<LoadingFullScreenProps>
): void {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.FULL_LOADING_SHOW))
  LayoutRoot.setComponent(LayoutRoot.Type.FULL_LOADING, <LoadingFullScreen {...props} />)

  const documentBody = window.document.body

  if (documentBody) {
    documentBody.classList.add('gm-loading-body-overflow')
  }
}

LoadingFullScreen.hide = function () {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.FULL_LOADING_HIDE))
  LayoutRoot.removeComponent(LayoutRoot.Type.FULL_LOADING)

  const documentBody = window.document.body
  if (documentBody) {
    documentBody.classList.remove('gm-loading-body-overflow')
  }
}

export default LoadingFullScreen
