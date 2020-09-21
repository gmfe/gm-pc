import React, { FC, MouseEvent } from 'react'
import { ItemProps } from './types'
import { Flex } from '../flex'
import classNames from 'classnames'
import { Checkbox } from '../checkbox'
import { IconExpand } from '../icon_expand'

const Item: FC<ItemProps> = ({
  expand,
  onExpand,
  checked,
  indeterminate,
  onCheck,
  flatItem: { isLeaf, level, data },
  renderLeafItem = (data) => data.text,
  renderGroupItem = (data) => data.text,
  active = false,
  onActive,
  findActive,
  disabledCheckbox,
  style,
}) => {
  const handleGroup = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onExpand()
  }

  const handleRadio = () => {
    onCheck()
  }

  const handleActive = () => {
    onActive(data)
  }

  return (
    <Flex
      alignCenter
      className={classNames('gm-tree-list-item', {
        active,
        'gm-tree-list-item-find-active': findActive,
      })}
      style={{
        ...style,
        paddingLeft: `calc(${level}em + 5px)`,
      }}
      data-value={data.value}
    >
      {!isLeaf && (
        <IconExpand className='gm-margin-left-5' onClick={handleGroup} active={expand} />
      )}
      {level > 0 && isLeaf && <div style={{ width: '2em' }} />}
      {!disabledCheckbox && (
        <Checkbox
          checked={checked}
          onChange={handleRadio}
          indeterminate={indeterminate}
          className='gm-padding-left-5'
        />
      )}
      <Flex
        flex
        column
        onClick={handleActive}
        justifyCenter
        style={{ height: '100%' }}
        className='gm-margin-left-5'
      >
        {isLeaf ? renderLeafItem(data) : renderGroupItem(data)}
      </Flex>
    </Flex>
  )
}

export default React.memo(Item)
