import React, { useMemo, useState, useEffect, FC, MouseEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '../flex'
import { Checkbox } from '../checkbox'
import { listToFlatFilterWithGroupSelected, getLeafValues, listToFlat } from './util'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import SVGExpand from '../../svg/expand.svg'
import SVGCloseup from '../../svg/closeup.svg'
import { ListProps, TreeListItem, ItemProps } from './types'

const Item: FC<ItemProps> = ({
  isGrouped,
  onGroup,
  isSelected,
  isIndeterminate,
  onSelect,
  flatItem: { isLeaf, level, data },
  style,
  renderLeafItem = (data) => data.text,
  renderGroupItem = (data) => data.text,
  active = false,
  onActive,
}) => {
  const handleGroup = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onGroup(data)
  }

  const handleRadio = () => {
    onSelect(data, !isSelected)
  }

  const handleActive = () => {
    onActive(data)
  }

  return (
    <Flex
      alignCenter
      className={classNames('gm-tree-v2-list-item', active && 'active')}
      style={{
        ...style,
        paddingLeft: `calc(${level}em + 5px)`,
      }}
    >
      {!isLeaf && (
        <div className='gm-padding-left-5' onClick={handleGroup}>
          {isGrouped ? (
            <SVGCloseup className='gm-tree-v2-list-item-close' />
          ) : (
            <SVGExpand className='gm-tree-v2-list-item-expand' />
          )}
        </div>
      )}
      {level > 0 && isLeaf && <div style={{ width: '2em' }} />}
      <Checkbox
        checked={isSelected}
        onChange={handleRadio}
        indeterminate={isIndeterminate}
        className='gm-padding-left-5'
      />
      <Flex flex column onClick={handleActive} justifyCenter style={{ height: '100%' }}>
        {isLeaf ? renderLeafItem(data) : renderGroupItem(data)}
      </Flex>
    </Flex>
  )
}

const List: FC<ListProps> = ({
  list,
  groupSelected,
  onGroupSelect,
  selectedValues,
  onSelectValues,
  listHeight,
  renderLeafItem,
  renderGroupItem,
  onActiveValues,
  indeterminateList,
  activeValue,
  listRef,
}) => {
  const [active, setActive] = useState(null)
  useEffect(() => {
    // 定位时，将定位项设置为 active 项
    const flat = listToFlat(
      list,
      () => true,
      () => true
    )
    const data = _.filter(flat, (item) => item.data.value === activeValue)
    const values = data.length > 0 ? getLeafValues([data[0].data]) : []
    onActiveValues(values)
    setActive(activeValue)
  }, [activeValue])
  const flatList = useMemo(() => {
    return listToFlatFilterWithGroupSelected(list, groupSelected)
  }, [list, groupSelected])

  const handleGroup = (data: TreeListItem) => {
    onGroupSelect(_.xor(groupSelected, [data.value]))
  }

  const handleSelect = (data: TreeListItem, isSelected: boolean) => {
    const values = getLeafValues([data])

    if (isSelected) {
      onSelectValues(_.uniq(selectedValues.concat(values)))
    } else {
      onSelectValues(_.difference(selectedValues, values))
    }
  }

  const handleActive = (data: TreeListItem) => {
    const values = getLeafValues([data])

    setActive(data.value)
    onActiveValues(values)
  }

  const Row: FC<ListChildComponentProps> = ({ index, style }) => {
    const flatItem = flatList[index]
    const isGrouped = groupSelected.includes(flatItem.data.value)

    const selectedLeafValues = _.intersection(selectedValues, flatItem.leafValues)
    const indeterminateLeafValues = _.intersection(indeterminateList, flatItem.leafValues)

    let isSelected
    let isIndeterminate
    if (flatItem.isLeaf) {
      isSelected = selectedValues.includes(flatItem.data.value)
      isIndeterminate = _.includes(indeterminateList, flatItem.data.value)
    } else {
      isSelected =
        flatItem.leafValues.length !== 0 &&
        flatItem.leafValues.length === selectedLeafValues.length
      isIndeterminate =
        (selectedLeafValues.length !== 0 || indeterminateLeafValues.length !== 0) &&
        !isSelected
    }

    return (
      <Item
        key={flatItem.data.value}
        isGrouped={isGrouped}
        onGroup={handleGroup}
        onSelect={handleSelect}
        isSelected={isSelected}
        isIndeterminate={isIndeterminate}
        flatItem={flatItem}
        style={style}
        renderLeafItem={renderLeafItem}
        renderGroupItem={renderGroupItem}
        active={flatItem.data.value === active}
        onActive={handleActive}
      />
    )
  }

  return (
    <FixedSizeList
      ref={listRef}
      height={listHeight}
      width='100%'
      itemCount={flatList.length}
      itemSize={28}
    >
      {Row}
    </FixedSizeList>
  )
}

export default List
