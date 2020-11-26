import React from 'react'
import Label from './index'

export const ComLabel = () => {
  return (
    <div className='gm-padding-10'>
      <Label className='gm-margin-lr-5'>标签</Label>
      <Label type='primary' className='gm-margin-lr-5'>
        标签
      </Label>
      <Label type='danger' className='gm-margin-lr-5'>
        标签
      </Label>
      <Label type='inactive' className='gm-margin-lr-5'>
        标签
      </Label>
      <Label type='gray' className='gm-margin-lr-5'>
        标签
      </Label>
    </div>
  )
}

export default {
  title: '其他/Label',
}
