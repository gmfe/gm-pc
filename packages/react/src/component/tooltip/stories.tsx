import React from 'react'
import Tooltip from './tooltip'

export const ComTooltip = () => (
  <div style={{ padding: '100px' }}>
    <Tooltip
      popup={
        <div style={{ width: '100px', height: '100px' }}>
          <div>hello</div>
        </div>
      }
    />
    <Tooltip popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span style={{ backgroundColor: 'red' }}>hover tip</span>
    </Tooltip>
    <br />
    <Tooltip right popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span>right hover tip</span>
    </Tooltip>
    <Tooltip center popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span>center hover tip</span>
    </Tooltip>
    <br />
    <Tooltip top popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span>top hover tip</span>
    </Tooltip>
  </div>
)

export default {
  title: '反馈/Tooltip',
}
