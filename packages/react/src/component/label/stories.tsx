import React from 'react'
import Label from './index'

export const ComLabel = () => {
  return (
    <div>
      <Label>标签</Label>
      <Label type='primary'>标签</Label>
      <Label type='success'>标签</Label>
      <Label type='danger'>标签</Label>
    </div>
  )
}

export default {
  title: '基础/Label',
}
