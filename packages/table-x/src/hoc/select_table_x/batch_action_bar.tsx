import React, { FC, ReactNode } from 'react'
import { getLocale } from '@gm-pc/locales'
import { Button, Flex, Popover } from '@gm-pc/react'

import SVGRemove from '../../svg/remove.svg'
import SVGDelete from '../../svg/delete.svg'
import SVGEdit from '../../svg/edit-pen.svg'
import SVGBusiness from '../../svg/business.svg'
import { TableXBatchActionBarProps } from './types'

const ICON_MAP: { [key: string]: ReactNode } = {
  delete: <SVGDelete />,
  edit: <SVGEdit />,
  business: <SVGBusiness />,
}

const TableXBatchActionBar: FC<TableXBatchActionBarProps> = ({
  isSelectAll,
  pure,
  count,
  batchActions,
  toggleSelectAll,
  onClose,
}) => {
  let selectAllButton: ReactNode
  if (!pure) {
    selectAllButton = (
      <Button
        type='primary'
        className='gm-margin-left-20'
        onClick={() => toggleSelectAll && toggleSelectAll(!isSelectAll)}
      >
        {isSelectAll ? getLocale('勾选当前页内容') : getLocale('勾选所有页内容')}
      </Button>
    )
  }

  return (
    <Flex className='gm-react-table-select-batch-action-bar' alignCenter>
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
      {selectAllButton}
      <div className='gm-text-bold gm-margin-left-20'>
        {getLocale('已选择')}
        <span className='gm-text-primary'>{isSelectAll ? getLocale('所有') : count}</span>
        {getLocale('项')}
      </div>
      {!!batchActions.length && <div className='gm-margin-left-20'>|</div>}
      {batchActions
        .filter((item) => item.show !== false)
        .map((item) => (
          <div
            data-id={item.dataId}
            key={item.name}
            onClick={item.onClick?.bind(null)}
            style={{ marginLeft: '30px' }}
            className='gm-text-hover-primary gm-cursor gm-text-bold'
          >
            <span className='gm-padding-right-5'>{ICON_MAP[item.type]}</span>
            {item.name}
          </div>
        ))}
    </Flex>
  )
}

export default TableXBatchActionBar
