import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { BaseLevelListProps, LevelListProps } from './types'
import LevelItem from './level_item'
import { Flex } from '../flex'
import { getLevel } from './utils'
import { TreeDataItem } from '../../types'

function BaseLevelList<V = any>({
  titles = [],
  data,
  selected,
  onSelect,
  willActiveSelected,
  onWillActiveSelect,
  isReverse,
  onlySelectLeaf,
  isForFunctionSet,
  className,
  ...rest
}: BaseLevelListProps<V>) {
  const handleSelect = () => {
    onSelect(willActiveSelected)
  }

  const handleListItemMouseEnter = (index: number, item: TreeDataItem<V>) => {
    // slice 避免引用
    const newWill = willActiveSelected.slice(0, index + 1)
    newWill[index] = item.value
    onWillActiveSelect(newWill)
  }

  const handleMouseLeave = () => {
    // 离开的时候要重置下 willActiveSelected 为 selected
    // slice 避免引用
    onWillActiveSelect(selected.slice())
  }

  const level = getLevel<V>(data, willActiveSelected)

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

  let items = level.map((item, index) => (
    <LevelItem<V>
      data={item}
      key={index}
      title={titles![index]}
      selected={selected[index]}
      onSelect={handleSelect}
      willActiveSelected={willActiveSelected[index]}
      onListItemMouseEnter={(item) => {
        handleListItemMouseEnter(index, item)
      }}
      onlySelectLeaf={onlySelectLeaf}
      style={{ paddingTop: gaps[index] ? gaps[index] * 32 : 0 }}
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

function LevelList<V = any>({
  data,
  willActiveSelected,
  onWillActiveSelect,
  ...rest
}: LevelListProps<V>) {
  const [will, setWill] = useState(willActiveSelected || [])

  useEffect(() => {
    if (willActiveSelected) {
      setWill(willActiveSelected)
    }
  }, [data, willActiveSelected])

  const handleWill = (newWill: V[]) => {
    if (onWillActiveSelect) {
      onWillActiveSelect(newWill)
    } else {
      setWill(newWill)
    }
  }

  return (
    <BaseLevelList<V>
      {...rest}
      data={data}
      willActiveSelected={will}
      onWillActiveSelect={handleWill}
    />
  )
}

export default LevelList
