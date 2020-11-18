import React from 'react'

import Card from './card'

const handleClick = () => {
  console.log('click!')
}

export const ComCard = () => (
  <>
    <Card
      className='gm-margin-10'
      title='标题标题标题标题标题标题'
      labelText='默认'
      labelType='primary'
      style={{ width: '250px' }}
      onClick={handleClick}
      actions={[
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
    </Card>
    <Card
      className='gm-margin-10'
      title='标题标题标题标题标题标题'
      topLabelText='已激活'
      labelText='默认'
      labelType='primary'
      onClick={handleClick}
      actions={[
        {
          text: '功能1',
          onClick: () => {
            console.log('功能1')
          },
        },
      ]}
      style={{ width: '250px' }}
    >
      <div>描述1</div>
      <div>描述2</div>
      <div>描述3</div>
    </Card>
    <Card
      className='gm-margin-10'
      title='标题标题标题标题标题标题'
      inactive
      topLabelText='未激活'
      labelText='默认'
      labelType='primary'
      onClick={handleClick}
      actions={[
        {
          text: '功能1',
          onClick: () => {
            console.log('功能1')
          },
        },
      ]}
      style={{ width: '250px' }}
    >
      <div>描述1</div>
      <div>描述2</div>
      <div>描述3</div>
    </Card>
    <Card className='gm-margin-10' style={{ width: '250px' }} onClick={handleClick}>
      <div>描述1</div>
      <div>描述2</div>
      <div>描述3</div>
    </Card>
  </>
)

export default {
  title: '布局/Card',
}
