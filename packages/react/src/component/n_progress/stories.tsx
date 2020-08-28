import React from 'react'
import NProgress from './n_progress'

export const ComNProgress = () => (
  <div>
    <button
      onClick={() => {
        NProgress.start()
      }}
    >
      start
    </button>
    <button
      onClick={() => {
        NProgress.done()
      }}
    >
      end
    </button>
  </div>
)

export default {
  title: '反馈/NProgress',
}
