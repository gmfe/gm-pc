import React, { FC, MouseEvent, ReactNode } from 'react'
import { getLocale } from '@gm-pc/locales'
import { Button, Flex, Popover } from '@gm-pc/react'
import SVGRemove from '../svg/remove.svg'
import classNames from 'classnames'

interface BatchActionBarItem {
  children: string | ReactNode
  onClick(event: MouseEvent): void
  getDisabled?(selected: any[], isSelectAll: boolean): boolean
}

interface BatchActionBarProps {
  /** 是否选中所有页 */
  isSelectAll: boolean
  selected: any[]
  /** 选中多少项 */
  count: number
  /** 批量操作按钮 */
  batchActions: BatchActionBarItem[]
  /** 所有页/当前页 切换函数 */
  toggleSelectAll?(isSelectAll: boolean): void
  /** 点击关闭 BatchActionBar 的回调函数 */
  onClose?(): void
  /** pure=true，不展示[勾选所有页内容]按钮，也没有勾选所有页相关操作 */
  pure?: boolean
}

/** 会暴露出去，谨慎修改 */
const BatchActionBar: FC<BatchActionBarProps> = ({
  isSelectAll,
  selected,
  pure,
  count,
  batchActions,
  toggleSelectAll,
  onClose,
}) => {
  return (
    <Flex alignCenter>
      <Popover
        type='hover'
        offset={-8}
        showArrow
        popup={<div className='gm-padding-5'>{getLocale('取消批量勾选')}</div>}
      >
        <span style={{ width: '12px' }} className='gm-cursor' onClick={onClose}>
          <SVGRemove />
        </span>
      </Popover>
      {!pure && (
        <Button
          type='primary'
          className='gm-margin-left-20'
          onClick={() => toggleSelectAll && toggleSelectAll(!isSelectAll)}
        >
          {isSelectAll ? getLocale('勾选当前页内容') : getLocale('勾选所有页内容')}
        </Button>
      )}
      <div className='gm-text-bold gm-margin-left-20'>
        {getLocale('已选择')}
        <span className='gm-text-primary'>{isSelectAll ? getLocale('所有') : count}</span>
        {getLocale('项')}
      </div>
      {!!batchActions.length && <div className='gm-margin-left-20'>|</div>}
      {batchActions.map((item, index) => {
        let disabled = false

        if (item.getDisabled) {
          disabled = item.getDisabled(selected, isSelectAll)
        }

        return (
          <div
            key={index}
            onClick={(event) => {
              !disabled && item.onClick(event)
            }}
            className={classNames('gm-cursor gm-text-bold gm-margin-left-20', {
              'gm-text-hover-primary': !disabled,
              'gm-not-allowed': disabled,
            })}
          >
            {item.children}
          </div>
        )
      })}
    </Flex>
  )
}

export default BatchActionBar
export type { BatchActionBarProps, BatchActionBarItem }
