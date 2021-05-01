import React, { CSSProperties, ReactNode, useState, useRef } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, FlexProps } from '../flex'

interface TabsItem<V extends string | number> {
  text: string
  value: V
  children: ReactNode
  disabled?: boolean
}

interface TabsProps<V extends string | number> extends Omit<FlexProps, 'onChange'> {
  tabs: TabsItem<V>[]
  defaultActive?: V
  active?: V
  onChange?(value: V): void
  keep?: boolean
  light?: boolean
  /* didMount之后不再重新渲染 */
  activeOnce?: boolean
  /* 是否全屏 */
  full?: boolean
  className?: string
  column?: boolean
  style?: CSSProperties
}

function Tabs<V extends string | number = string>(props: TabsProps<V>) {
  const {
    tabs,
    light,
    active,
    defaultActive,
    keep,
    onChange,
    className,
    column = true,
    activeOnce,
    full,
    ...rest
  } = props
  const baseTabClassName = `gm-${full ? 'framework-full-' : ''}tabs`
  if (active !== undefined && defaultActive !== undefined) {
    console.warn('prop `active` and prop `defaultActive` can not exist at the same time!')
  }

  if (active !== undefined && !onChange) {
    console.warn('prop `active` `onChange` must exist at the same time!')
  }

  const [selected, setSelected] = useState(defaultActive || active)
  const hasSelectedsRef = useRef<Set<V>>(new Set())
  const handleClick = (value: V) => {
    setSelected(value)
    onChange && onChange(value)
  }

  const tabsChildrenKeep = (tabs: TabsItem<V>[]) => (
    <>
      {_.map(tabs, (tab: TabsItem<V>) => (
        <div
          key={tab.value}
          className={classNames(`${baseTabClassName}-content-item`, {
            'gm-hidden': selected !== tab.value,
          })}
        >
          {tab.children}
        </div>
      ))}
    </>
  )

  const tabsChildren = () => {
    if (activeOnce && selected) {
      hasSelectedsRef.current.add(selected)
    }
    let items: typeof tabs = []
    if (activeOnce) {
      items = _.filter(tabs, (tab) => hasSelectedsRef.current.has(tab.value))
    } else {
      const item = _.find(tabs, (tab) => tab.value === selected)
      if (item) {
        items = [item]
      }
    }
    return tabsChildrenKeep(items)
  }

  return (
    <Flex
      {...rest}
      column={column}
      className={classNames(
        baseTabClassName,
        {
          'gm-tabs-light': light,
        },
        className
      )}
    >
      <div className={`${baseTabClassName}-head-fix`}>
        <Flex alignEnd className={`${baseTabClassName}-head`}>
          {_.map(tabs, (tab) =>
            tab.disabled ? (
              <div
                key={tab.value}
                className={`${baseTabClassName}-head-item`}
                style={{ color: '#a9a9a9' }}
              >
                {tab.text}
              </div>
            ) : (
              <div
                key={tab.value}
                className={classNames(`${baseTabClassName}-head-item`, {
                  active: selected === tab.value,
                })}
                onClick={() => handleClick(tab.value)}
              >
                {tab.text}
              </div>
            )
          )}
        </Flex>
      </div>
      <Flex flex column className={`${baseTabClassName}-content`}>
        {keep ? tabsChildrenKeep(tabs) : tabsChildren()}
      </Flex>
    </Flex>
  )
}

export default Tabs
export type { TabsProps, TabsItem }
