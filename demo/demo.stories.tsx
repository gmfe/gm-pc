import React from 'react'

import { observable } from 'mobx'

const store = observable({
  data: [1, 2],
})

export const demo = () => {
  return (
    <div>
      demo {store.data}
      <div className='tw-pt-1 tw-bg-red-100 tw-bg-red tw-bg-primary'>tailwindcss</div>
    </div>
  )
}

export default {
  title: 'DEMO',
}
