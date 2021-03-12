import React, { FC, CSSProperties, ReactNode, useState } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, FlexProps } from '../flex'

interface TabsItem {
  text: string
  value: string
  children: ReactNode
  disabled: boolean
}

interface TabsProps extends Omit<FlexProps, 'onChange'> {
  tabs: TabsItem[]
  defaultActive?: string
  active?: string
  onChange?(value: string): void
  keep?: boolean
  light?: boolean
  className?: string
  column?: boolean
  style?: CSSProperties
}

const Tabs: FC<TabsProps> = (props) => {
  const {
    tabs,
    light,
    active,
    defaultActive,
    keep,
    onChange,
    className,
    column = true,
    ...rest
  } = props
  if (active !== undefined && defaultActive !== undefined) {
    console.warn('prop `active` and prop `defaultActive` can not exist at the same time!')
  }

  if (active !== undefined && !onChange) {
    console.warn('prop `active` `onChange` must exist at the same time!')
  }

  const [selected, setSelected] = useState(defaultActive || active)

  const handleClick = (value: string) => {
    setSelected(value)
    onChange && onChange(value)
  }

  const tabsChildrenKeep = () => (
    <>
      {_.map(tabs, (tab: TabsItem) => (
        <div
          key={tab.value}
          className={classNames('gm-tabs-content-item', {
            hidden: selected !== tab.value,
          })}
        >
          {tab.children}
        </div>
      ))}
    </>
  )

  const tabsChildren = () => {
    const item = _.find(tabs, (tab) => tab.value === selected)
    return <div className='gm-tabs-content-item'>{item && item.children}</div>
  }

  return (
    <Flex
      {...rest}
      column={column}
      className={classNames(
        'gm-tabs',
        {
          'gm-tabs-light': light,
        },
        className
      )}
    >
      <div className='gm-tabs-head-fix'>
        <Flex alignEnd className='gm-tabs-head'>
          {_.map(tabs, (tab) =>
            tab.disabled ? (
              <div
                key={tab.value}
                className='gm-tabs-head-item'
                style={{ color: '#a9a9a9' }}
              >
                {tab.text}
              </div>
            ) : (
              <div
                key={tab.value}
                className={classNames('gm-tabs-head-item', {
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
      <Flex flex column className='gm-tabs-content'>
        {keep ? tabsChildrenKeep() : tabsChildren()}
      </Flex>
    </Flex>
  )
}

export default Tabs
export type { TabsProps, TabsItem }
