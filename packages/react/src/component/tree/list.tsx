import React, { useMemo, FC, useImperativeHandle, useRef } from 'react'
import _ from 'lodash'
import { listToFlatFilterWithGroupSelected, getLeafValues } from './util'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { ListProps, TreeListItem, ListApi } from './types'
import Item from './item'

const List = React.forwardRef<ListApi, ListProps>(
  (
    {
      list,
      groupSelected,
      onGroupSelect,
      selectedValues,
      onSelectValues,
      listHeight,
      listWidth,
      renderLeafItem,
      renderGroupItem,
      indeterminateList,
      activeValue,
      onActiveValue,
      findValue,
    },
    ref
  ) => {
    const refList = useRef<FixedSizeList>(null)

    const flatList = useMemo(() => {
      return listToFlatFilterWithGroupSelected(list, groupSelected)
    }, [list, groupSelected])

    useImperativeHandle(
      ref,
      () => {
        return {
          apiDoScrollToValue: (value: any) => {
            const index = _.findIndex(flatList, (v) => v.data.value === value)

            if (refList.current) {
              refList.current.scrollToItem(index)
            }
            console.log(value, index, flatList)
          },
        }
      },
      [flatList]
    )

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

    const Row: FC<ListChildComponentProps> = ({ index, style }) => {
      const flatItem = flatList[index]
      const isGrouped = groupSelected.includes(flatItem.data.value)

      const selectedLeafValues = _.intersection(selectedValues, flatItem.leafValues)
      const indeterminateLeafValues = _.intersection(
        indeterminateList,
        flatItem.leafValues
      )

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

      const handleActive = (item: TreeListItem) => {
        onActiveValue && onActiveValue(item.value, item)
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
          active={flatItem.data.value === activeValue}
          onActive={handleActive}
          findActive={findValue === flatItem.data.value}
        />
      )
    }

    return (
      <FixedSizeList
        ref={refList}
        height={listHeight}
        width={listWidth}
        itemCount={flatList.length}
        itemSize={28}
      >
        {Row}
      </FixedSizeList>
    )
  }
)

export default List
