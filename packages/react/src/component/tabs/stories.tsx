import React from 'react'
import Tabs from './tabs'
import { observable } from 'mobx'

const store = observable({
  active: '1',
  setActive(index: string) {
    this.active = index
  },
})

const tabs = [
  {
    text: 'Tab1',
    value: '1',
    children: <div>1</div>,
  },
  {
    text: 'Tab2',
    value: '2',
    children: <div>2</div>,
  },
]

export const ComTabs = () => (
  <Tabs
    tabs={tabs}
    active={store.active}
    onChange={(active) => store.setActive(active)}
  />
)

export default {
  title: '布局/Tabs',
}
