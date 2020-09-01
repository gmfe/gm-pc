import React from 'react'
import { Button } from '../button'
import Drawer from './drawer'
import { DrawerSize } from './types'
import _ from 'lodash'

export const ComDrawer = () => {
  return (
    <Button
      onClick={() => {
        Drawer.render({
          children: 'Hello world',
          onHide: Drawer.hide,
        })
      }}
    >
      render
    </Button>
  )
}

export const ComDrawerWithSize = () => {
  function render(size: DrawerSize) {
    Drawer.render({
      size,
      children: '我是内容',
      onHide: Drawer.hide,
    })
  }

  return (
    <div>
      {_.map(['sm', 'md', 'lg'], (size: DrawerSize) => (
        <Button type='primary' onClick={() => render(size)}>
          size {size}
        </Button>
      ))}
    </div>
  )
}

export default {
  title: '其他/Drawer',
}
