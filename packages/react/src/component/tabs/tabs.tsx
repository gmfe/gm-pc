import React, { CSSProperties, ReactNode, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, FlexProps } from '../flex'
import SVGCloseSquare from '../../svg/close-square.svg'
import PopupContentConfirm from '../popup/popup_content_confirm'
import Popover from '../popover/popover'
import { anyCallback } from '../../types'
import { judgeFunction } from '../../common/utils/utils'
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
  onChangeValidate?(): boolean
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
  /* 而外操作，比如新增tab的操作 */
  extraAction?: ReactNode
  popup?(value: V, closePopup: anyCallback): ReactNode
  isPopover?: boolean
  popoverContent?: ReactNode
  popverTitle?: string
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
    onChangeValidate,
    className,
    column = true,
    activeOnce,
    full,
    type,
    extraAction,
    isPopover,
    popup,
    popoverContent,
    popverTitle,
    ...rest
  } = props

  const editableCard: boolean = type === 'editable-card'

  const baseTabClassName = `gm-${full ? 'framework-full-' : ''}tabs`
  if (active !== undefined && defaultActive !== undefined) {
    console.warn('prop `active` and prop `defaultActive` can not exist at the same time!')
  }

  if (active !== undefined && !onChange) {
    console.warn('prop `active` `onChange` must exist at the same time!')
  }
  const [selected, setSelected] = useState(defaultActive || active)
  const hasSelectedsRef = useRef<Set<V>>(new Set())

  // tab滚动使用
  const tabRef = useRef(null)

  useEffect(() => {
    defaultActive === undefined && active !== undefined && setSelected(active)
  }, [active, defaultActive])

  // 增加切换tab的校验
  const handleClick = (value: V) => {
    if (!judgeFunction(onChangeValidate)) return
    setSelected(value)
    judgeFunction(onChange, value)
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
    judgeFunction(onClose, value)
  }

  const handleDelete = (value: V) => {
    handleClose(value)
  }

  const innerPopup: TabsProps<V>['popup'] = (value, closePopover) => {
    if (popup) {
      return popup(value, closePopover)
    }

    return (
      <PopupContentConfirm
        type='delete'
        title={popverTitle}
        onCancel={closePopover}
        onDelete={() => handleDelete(value)}
      >
        {popoverContent}
      </PopupContentConfirm>
    )
  }

  return (
    <Flex
      {...rest}
      column={column}
      className={classNames(
        baseTabClassName,
        {
          'gm-tabs-light': light,
          'gm-tabs-edit': editableCard,
        },
        className
      )}
    >
      <div className={`${baseTabClassName}-head-fix`}>
        <Flex alignEnd className={`${baseTabClassName}-head`}>
          <Flex ref={tabRef} alignEnd className='gm-tabs-max-head-scroll'>
            {_.map(tabs, (tab) => {
              const isClose = tab.closable === false ? false : editableCard
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
                      'gm-tabs-text-overflow-ellipsis': editableCard,
                    })}
                    onClick={tab.disabled ? _.noop : () => handleClick(tab.value)}
                  >
                    {tab.text}
                  </span>

                  {isClose && isPopover && (
                    <Popover
                      center
                      popup={(closePopover) => innerPopup(tab.value, closePopover)}
                    >
                      <div>
                        <SVGCloseSquare
                          className='tw-ml-1'
                          style={{ width: '10px', height: '10px', marginBottom: '2px' }}
                        />
                      </div>
                    </Popover>
                  )}
                </Flex>
              )
            })}
          </Flex>
          {extraAction && (
            <Flex style={{ minWidth: '80px' }} className='tw-h-6 tw-ml-2'>
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
