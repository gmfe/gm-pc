import React, { FC } from 'react'
import classNames from 'classnames'
import { LevelListDataItem, LevelListProps } from './types'
import LevelItem from './level_item'
import { Flex } from '../flex'
import { getLevel } from './utils'

const LevelList: FC<LevelListProps> = ({
  titles = [],
  data,
  selected,
  onSelect,
  willActiveSelected,
  onWillActiveSelect,
  isReverse,
  className,
  isForFunctionSet,
  ...rest
}) => {
  const handleSelect = () => {
    onSelect(willActiveSelected)
  }

  const handleListItemMouseEnter = (index: number, value: LevelListDataItem) => {
    // slice 避免饮用
    const newWill = willActiveSelected.slice(0, index + 1)
    newWill[index] = value.value
    onWillActiveSelect(newWill)
  }

  const handleMouseLeave = () => {
    // 离开的时候要重置下 willActiveSelected 为 selected
    // slice 避免饮用
    onWillActiveSelect(selected.slice())
  }

  const level = getLevel(data, willActiveSelected)

  let gaps: number[] = []
  if (isForFunctionSet) {
    let indexes = willActiveSelected.map((value, index) =>
      level[index].findIndex((vv) => vv.value === value)
    )
    indexes = [0, ...indexes]
    let top = 0
    gaps = indexes.map((value) => {
      top += value
      return top
    })
  }

  let items = level.map((value, index) => (
    <LevelItem
      data={value}
      key={index}
      title={titles![index]}
      selected={selected[index]}
      onSelect={handleSelect}
      willActiveSelected={willActiveSelected[index]}
      onListItemMouseEnter={(value) => handleListItemMouseEnter(index, value)}
      style={{ paddingTop: gaps[index] ? gaps[index] * 30 : 0 }}
    />
  ))

  if (isReverse) {
    items = items.reverse()
  }

  return (
    <Flex
      {...rest}
      className={classNames(
        'gm-level-list',
        {
          'gm-level-list-for-function-set': isForFunctionSet,
        },
        className
      )}
      onMouseLeave={handleMouseLeave}
    >
      {items}
    </Flex>
  )
}

export default LevelList
