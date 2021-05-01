import React, { useEffect } from 'react'
import Tabs from './tabs'
import { observable } from 'mobx'

const A = ({ value }: { value: string }) => {
  useEffect(() => {
    console.log(value)
  }, [])
  return <div>{value}</div>
}
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
    children: <A value='Tab1' />,
  },
  {
    text: 'Tab2',
    value: '2',
    children: <A value='Tab2' />,
  },
  {
    text: 'Tab3',
    value: '3',
    children: <A value='Tab3' />,
  },
  {
    text: 'Tab4',
    value: '4',
    children: <A value='Tab4' />,
  },
  {
    text: '长度比较长的tabs文本',
    value: '5',
    children: <A value='Tab5' />,
  },
]

export const ComTabs = () => (
  <Tabs
    tabs={tabs}
    active={store.active}
    onChange={(active) => store.setActive(active)}
  />
)
export const ActiveOOnceTabs = () => (
  <>
    <div>tab active后再次点击不会重新didMount</div>
    <Tabs
      tabs={tabs}
      activeOnce
      active={store.active}
      onChange={(active) => store.setActive(active)}
    />
  </>
)

export const FullTabs = () => (
  <Tabs
    full
    tabs={tabs}
    activeOnce
    active={store.active}
    onChange={(active) => store.setActive(active)}
  />
)
export const LightTabs = () => (
  <Tabs
    tabs={tabs}
    light
    active={store.active}
    onChange={(active) => store.setActive(active)}
  />
)

export default {
  title: '布局/Tabs',
}
