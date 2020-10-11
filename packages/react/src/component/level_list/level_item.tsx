import React, { HTMLAttributes, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { LevelItemProps } from './types'
import SVGRightSmall from '../../svg/right-small.svg'
import { List } from '../list'
import { TreeDataItem } from '../../types'
import { Flex } from '../flex'
import _ from 'lodash'

function Item<V>({ item }: { item: TreeDataItem<V> }) {
  const hasChildren = item.children && !!item.children.length
  return (
    <Flex alignCenter>
      <Flex
        flex
        block
        className={classNames({ 'gm-margin-right-10 gm-text-ellipsis': hasChildren })}
      >
        {item.text}
      </Flex>
      {hasChildren && <SVGRightSmall className='gm-level-list-item-right' />}
    </Flex>
  )
}

function LevelItem<V>({
  title,
  data,
  selected,
  onSelect,
  onListItemMouseEnter,
  willActiveSelected,
  onlySelectLeaf,
  className,
  style,
}: LevelItemProps<V>) {
  const willActiveIndex = useMemo(
    () => data.findIndex((value) => value.value === willActiveSelected),
    [data, willActiveSelected]
  )

  const renderItem = useCallback((item: TreeDataItem<V>) => {
    return <Item item={item} />
  }, [])
  const getItemProps = useCallback(
    (item: TreeDataItem<V>): HTMLAttributes<HTMLDivElement> => ({
      onMouseEnter: () => onListItemMouseEnter && onListItemMouseEnter(item),
    }),
    [onListItemMouseEnter]
  )

  const handleSelect = (selected: V) => {
    const item = _.find<TreeDataItem<V>>(data, (v) => v.value === selected)

    if (onlySelectLeaf) {
      if (!item!.children) {
        onSelect(selected)
      }
    } else {
      onSelect(selected)
    }
  }

  return (
    <div className={classNames('gm-level-list-item', className)} style={style}>
      {title && <div className='gm-level-list-item-title'>{title}</div>}
      <List
        data={data}
        selected={selected}
        onSelect={handleSelect}
        renderItem={renderItem}
        getItemProps={getItemProps}
        willActiveIndex={willActiveIndex}
      />
    </div>
  )
}

export default LevelItem
