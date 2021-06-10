import React, { CSSProperties, ReactNode, useState, useRef, useEffect, Ref } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, FlexProps } from '../flex'
import SVGCloseSquare from '../../svg/close-square.svg'

interface TabsItem<V extends string | number> {
  text: string
  value: V
  children: ReactNode
  disabled?: boolean
  /* 是否可关闭 */
  closable?: boolean
  ref?: HTMLDivElement | null
}

interface TabsProps<V extends string | number> extends Omit<FlexProps, 'onChange'> {
  tabs: TabsItem<V>[]
  defaultActive?: V
  active?: V
  onChange?(value: V): void
  onClose?(value: V): void
  keep?: boolean
  light?: boolean
  /* didMount之后不再重新渲染 */
  activeOnce?: boolean
  /* 是否全屏 */
  full?: boolean
  className?: string
  column?: boolean
  /* 卡片类型 editable-card 可以编辑的卡片 */
  type?: 'editable-card'
  style?: CSSProperties
  extraAction?: ReactNode
}

function Tabs<V extends string | number = string>(props: TabsProps<V>) {
  const {
    tabs,
    light,
    active,
    defaultActive,
    keep,
    onChange,
    onClose,
    className,
    column = true,
    activeOnce,
    full,
    type,
    extraAction,
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

  // TODO: tab滚动使用
  const tabRef = useRef(null)

  useEffect(() => {
    setSelected(active)
    // TODO: tab滚动使用
    // const node: TabsItem<V> | undefined = tabs.find((f) => f.value === active)
    // console.log('node', node)
  }, [active])

  const handleClick = (value: V) => {
    setSelected(value)
    if (typeof onChange === 'function') onChange(value)
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

  const handleClose = (value: V) => {
    if (typeof onClose === 'function') onClose(value)
  }

  return (
    <Flex
      {...rest}
      column={column}
      className={classNames(
        baseTabClassName,
        {
          'gm-tabs-light': light,
          'gm-tabs-edit': type === 'editable-card',
        },
        className
      )}
    >
      <div className={`${baseTabClassName}-head-fix`}>
        <Flex alignEnd className={`${baseTabClassName}-head`}>
          <Flex ref={tabRef} alignEnd className='gm-tabs-max-head-scroll'>
            {_.map(tabs, (tab) => {
              const isClose = tab.closable === false ? false : type === 'editable-card'
              return (
                <Flex
                  alignCenter
                  id={`#gm-tabs-${tab.value}`}
                  ref={(ref) => (tab.ref = ref)}
                  key={tab.value}
                  className={classNames(`${baseTabClassName}-head-item`, {
                    active: !tab.disabled && selected === tab.value,
                    'gm-tabs-head-disabled': tab.disabled,
                    'gm-tabs-closable': isClose,
                  })}
                >
                  <span
                    title={tab.text}
                    className={classNames({
                      'gm-tabs-text-overflow-ellipsis': isClose && tab.text.length > 10,
                    })}
                    onClick={tab.disabled ? _.noop : () => handleClick(tab.value)}
                  >
                    {tab.text}
                  </span>

                  {isClose && (
                    <SVGCloseSquare
                      style={{ marginLeft: '5px', width: '10px', height: '10px' }}
                      onClick={() => handleClose(tab.value)}
                    />
                  )}
                </Flex>
              )
            })}
          </Flex>
          {extraAction && (
            <Flex style={{ lineHeight: '28px', marginLeft: '20px', minWidth: '80px' }}>
              {extraAction}
            </Flex>
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
