import React from 'react'
import LoadingIcon from './loading_icon'
import Loading from './loading'
import LoadingChunk from './loading_chunk'
import LoadingFullScreen from './loading_full_screen'
import { Button } from '../button'

export const ComLoading = () => <Loading text='加载中...' />

export const ComLoadingIcon = () => (
  <div>
    <LoadingIcon />
    <LoadingIcon size='5em' />
  </div>
)

export const ComLoadingWithSize = () => <Loading size='100px' />

export const ComLoadingChunk = () => (
  <LoadingChunk loading text='加载中...'>
    <div
      style={{
        height: '100px',
      }}
    >
      这是内容
    </div>
  </LoadingChunk>
)

export const ComLoadingFullScreen = () => (
  <Button
    onClick={() => {
      LoadingFullScreen.render({
        text: '拼命加载中...',
      })
      setTimeout(() => {
        LoadingFullScreen.hide()
      }, 3000)
    }}
  >
    整页加载
  </Button>
)

export default {
  title: '基础/Loading',
}
