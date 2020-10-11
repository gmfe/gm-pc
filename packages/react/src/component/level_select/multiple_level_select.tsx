import React, { useRef, ReactNode } from 'react'
import { LevelSelectDataItem, MultipleLevelSelectProps } from './types'
import { MultipleSelection } from '../multiple_selection'
import { Popover } from '../popover'
import { Flex } from '../flex'
import { LevelList } from '../level_list'
import _ from 'lodash'
import { getItems } from './util'
import { MultipleSelectionSelectedItem } from '../multiple_selection/multiple_selection'

const defaultRenderSelected = (items: any[]) => {
  return items.map((v) => v.text).join(',')
}

function MultipleLevelSelect<V = any>({
  data,
  selected,
  onSelect,
  disabled,
  renderSelected = defaultRenderSelected,
  titles,
  onlySelectLeaf,
  popoverType = 'focus',
  right,
  children,
  className,
  style,
}: MultipleLevelSelectProps<V>) {
  const popoverRef = useRef<Popover>(null)

  const handleLevelListSelect = (item: V[]): void => {
    popoverRef.current!.apiDoSetActive(false)

    // 先这样去重
    const newSelect = _.uniqBy(selected.concat([item]), (v) => v.join(','))

    onSelect(newSelect)
  }

  const handleMultipleSelectionSelect = (
    selectionSelected: MultipleSelectionSelectedItem<any>[]
  ) => {
    onSelect(
      _.map(selectionSelected, (v) => {
        return v.value
      })
    )
  }

  const renderPopup = (): ReactNode => {
    return (
      <Flex justifyEnd={right}>
        <LevelList
          isReverse={right}
          data={data}
          selected={[]}
          onSelect={handleLevelListSelect}
          titles={titles}
          onlySelectLeaf={onlySelectLeaf}
        />
      </Flex>
    )
  }

  // 二维
  const selectedItems: LevelSelectDataItem<V>[][] = _.map(selected, (v) => {
    return getItems(data, v)
  })

  // 转成符合 MultipleSelection 的数据
  const selectionSelected: MultipleSelectionSelectedItem<any>[] = _.map(
    selectedItems,
    (items) => {
      return {
        value: _.map(items, (v) => v.value),
        text: renderSelected(items),
      } as MultipleSelectionSelectedItem<any>
    }
  )

  return (
    <Popover
      ref={popoverRef}
      right={right}
      disabled={disabled}
      popup={renderPopup()}
      type={popoverType}
      pureContainer
    >
      {children ?? (
        <MultipleSelection<V[]>
          selected={selectionSelected}
          onSelect={handleMultipleSelectionSelect}
          className={className}
          style={style}
        />
      )}
    </Popover>
  )
}

export default MultipleLevelSelect
