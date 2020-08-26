import React from 'react'
import Divider from './divider'

export const ComDivider = () => (
  <div>
    <Divider>Align Center</Divider>
    <Divider align='left'>Align Left</Divider>
    <Divider align='right'>Align Right</Divider>
  </div>
)

export default {
  title: '布局/Divider',
}
