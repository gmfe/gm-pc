import React, { FC } from 'react'
import { LayoutRoot } from '../layout_root'

interface NProgressFC extends FC {
  start(): void
  done(): void
}

const NProgress: NProgressFC = () => (
  <div className='gm-n-progress gm-n-progress-loading' />
)

let timer: number | null
let reqLength = 0

NProgress.start = function () {
  reqLength = reqLength + 1
  if (reqLength === 1) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    LayoutRoot.setComponent(LayoutRoot.Type.N_PROGRESS, <NProgress />)
  }
}

NProgress.done = function () {
  reqLength = reqLength - 1
  const nProgress = document.querySelector('.gm-n-progress')
  if (!reqLength && !timer) {
    nProgress && (nProgress.className = 'gm-n-progress gm-n-progress-completed')
    timer = window.setTimeout(function () {
      LayoutRoot.removeComponent(LayoutRoot.Type.N_PROGRESS)
      timer = null
    }, 250)
  }
}

export default NProgress
