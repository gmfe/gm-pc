import React, { FC } from 'react'
import { getLocale } from '@gm-pc/locales'
import { Button, Flex, Popover } from '@gm-pc/react'
import SVGRemove from '../../svg/remove.svg'
import { BatchActionBarProps } from './types'

const BatchActionBar: FC<BatchActionBarProps> = ({
  isSelectAll,
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
      {batchActions.map((item, index) => (
        <div
          key={index}
          onClick={(event) => item.onClick(event)}
          className='gm-text-hover-primary gm-cursor gm-text-bold gm-margin-left-20'
        >
          {item.children}
        </div>
      ))}
    </Flex>
  )
}

export default BatchActionBar
