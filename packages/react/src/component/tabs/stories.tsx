import React, { useEffect } from 'react'
import Tabs from './tabs'
import { TabsProps } from '.'
import { observable } from 'mobx'

const A = ({ value }: { value: string }) => {
  useEffect(() => {
    console.log(value)
  }, [value])
  return <div>{value}</div>
}

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

const store = observable({
  tabs: [...tabs],
  active: '1',
  setActive(index: string) {
    this.active = index
  },

  handleClose(value: string) {
    const index = this.tabs.findIndex((f) => f.value === value)
    this.tabs.splice(index, 1)
    if (store.active === value) {
      store.setActive(index === 0 ? this.tabs[index].value : this.tabs[index - 1].value)
    }
  },
  handleCloseDiv(value: string) {
    const index = this.tabs.findIndex((f) => f.value === value)
    this.tabs.splice(index, 1)
    if (store.active === value) {
      store.setActive(index === 0 ? this.tabs[index].value : this.tabs[index - 1].value)
    }
  },
  handleAdd() {
    store.tabs.push({
      text: '长度比较长的tabs文本',
      value: '' + store.tabs.length + 1,
      children: <A value='Tab5' />,
    })
  },
})

export const ComTabs = () => (
  <Tabs
    tabs={tabs}
    active={store.active}
    onChange={(active) => store.setActive(active)}
  />
)
export const ActiveOnceTabs = () => (
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

export const closeTabs = () => (
  <>
    <div>支持关闭弹出Popver</div>
    <Tabs
      tabs={store.tabs.slice()}
      light
      active={store.active}
      isPopover
      popoverTitle='这是标题'
      popoverContent='这是内容XXX'
      type='editable-card'
      onChange={(active) => store.setActive(active)}
      onClose={(value) => store.handleClose(value)}
    />
  </>
)
const popup: TabsProps<string>['popup'] = (value, closeFn) => (
  <div>
    asdasd &nbsp;
    <button onClick={closeFn}>取消</button>
    <button
      onClick={() => {
        store.handleCloseDiv(value)
        closeFn()
      }}
    >
      删除
    </button>
  </div>
)
export const diyPoupCloseTabs = () => (
  <>
    <div>自定义弹出poup＋关闭tabs</div>
    <Tabs
      tabs={store.tabs.slice()}
      light
      active={store.active}
      isPopover
      popoverTitle='这是标题'
      popoverContent='这是内容XXX'
      type='editable-card'
      popup={popup}
      onChange={(active) => store.setActive(active)}
      onClose={(value) => store.handleClose(value)}
    />
  </>
)
export const addTabs = () => (
  <>
    <div>增加添加规格</div>
    <Tabs
      tabs={store.tabs.slice()}
      light
      active={store.active}
      isPopover
      popoverTitle='这是标题'
      popoverContent='这是内容XXX'
      type='editable-card'
      onChange={(active) => store.setActive(active)}
      onClose={(value) => store.handleClose(value)}
      extraAction={<button onClick={store.handleAdd}>添加规格</button>}
    />
  </>
)
export default {
  title: '布局/Tabs',
}
