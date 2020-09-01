import React, { CSSProperties, HTMLAttributes, FC, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { Value, LevelListDataItem } from './types'
import SVGRightSmall from '../../svg/right-small.svg'
import { List } from '../list'

interface LevelItemProps {
  title?: string
  data: LevelListDataItem[]
  selected?: Value
  onSelect?(selected: Value): void
  onListItemMouseEnter?(value: LevelListDataItem): void
  willActiveSelected?: Value
  className?: string
  style?: CSSProperties
}

const LevelItem: FC<LevelItemProps> = ({
  title,
  data,
  selected,
  onSelect,
  onListItemMouseEnter,
  willActiveSelected,
  className,
  style,
}) => {
  const renderItem = useCallback((item: LevelListDataItem) => {
    const hasChildren = item.children && !!item.children.length
    return (
      <div className='gm-position-relative'>
        <div className={classNames({ 'gm-margin-right-10': hasChildren })}>
          {item.text}
        </div>
        {hasChildren && <SVGRightSmall className='gm-level-list-item-right' />}
      </div>
    )
  }, [])

  const getItemProps = useCallback(
    (item: LevelListDataItem): HTMLAttributes<HTMLDivElement> => ({
      onMouseEnter: () => onListItemMouseEnter && onListItemMouseEnter(item),
    }),
    [onListItemMouseEnter]
  )

  const willActiveIndex = useMemo(
    () => data.findIndex((value) => value.value === willActiveSelected),
    [data, willActiveSelected]
  )

  return (
    <div className={classNames('gm-level-list-item', className)} style={style}>
      {title && <div className='gm-level-list-item-title'>{title}</div>}
      <List
        data={data}
        selected={selected}
        onSelect={onSelect}
        renderItem={renderItem}
        getItemProps={getItemProps}
        willActiveIndex={willActiveIndex}
      />
    </div>
  )
}

export default LevelItem
