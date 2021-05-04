import React, { FC, useState, CSSProperties, ReactNode } from 'react'
import classNames from 'classnames'
import { Flex, FlexProps } from '@gm-pc/react'
import _ from 'lodash'

interface FullTabsItem {
  text: string
  value: string
  children: ReactNode
}

interface FullTabsProps extends Omit<FlexProps, 'onChange'> {
  tabs: FullTabsItem[]
  defaultActive?: string
  active?: string
  onChange?(value: string): void
  keep?: boolean
  className?: string
  column?: boolean
  /** 使用 row，需要手动将 column 设置为false, Tip: 因为 column 默认为 true，column 会于 row 冲突 */
  row?: boolean
  style?: CSSProperties
}
/**
 * 请使用Tabs,配置full
 * @deprecated
 */
const FullTabs: FC<FullTabsProps> = ({
  tabs,
  active,
  defaultActive,
  keep,
  onChange,
  className,
  column = true,
  ...rest
}) => {
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
      {_.map(tabs, (tab: FullTabsItem) => (
        <div
          key={tab.value}
          className={classNames('gm-framework-full-tabs-content-item', {
            'gm-hidden': selected !== tab.value,
          })}
        >
          {tab.children}
        </div>
      ))}
    </>
  )

  const tabsChildren = () => {
    const item = _.find(tabs, (tab) => tab.value === selected)
    return (
      <div className='gm-framework-full-tabs-content-item'>{item && item.children}</div>
    )
  }

  return (
    <Flex
      {...rest}
      column={column}
      className={classNames('gm-framework-full-tabs', className)}
    >
      <div className='gm-framework-full-tabs-head-fix'>
        <Flex alignEnd className='gm-framework-full-tabs-head'>
          {_.map(tabs, (tab) => (
            <div
              key={tab.value}
              className={classNames('gm-framework-full-tabs-head-item', {
                active: selected === tab.value,
              })}
              onClick={() => handleClick(tab.value)}
            >
              {tab.text}
            </div>
          ))}
        </Flex>
      </div>
      <Flex flex column className='gm-framework-full-tabs-content'>
        {keep ? tabsChildrenKeep() : tabsChildren()}
      </Flex>
    </Flex>
  )
}

export default FullTabs
export type { FullTabsProps, FullTabsItem }
