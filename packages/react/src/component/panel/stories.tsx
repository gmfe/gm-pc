import React from 'react'

import Panel from './panel'

export const ComPanel = () => (
  <>
    <Panel
      className='gm-margin-10'
      title='标题标题'
      labelText='默认'
      labelType='primary'
      style={{ width: '250px' }}
      more={[
        {
          text: '功能1',
          onClick: () => {
            console.log('功能1')
          },
        },
        {
          text: '功能2',
          onClick: () => {
            console.log('功能2')
          },
        },
      ]}
    >
      <div>描述1</div>
      <div>描述2</div>
      <div>描述3</div>
    </Panel>
    <Panel className='gm-margin-10' style={{ width: '250px' }}>
      <div>描述1</div>
      <div>描述2</div>
      <div>描述3</div>
    </Panel>
  </>
)

export default {
  title: '表单/Panel',
}
