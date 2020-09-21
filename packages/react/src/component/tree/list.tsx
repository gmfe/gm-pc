import React, { useMemo, FC, useImperativeHandle, useRef } from 'react'
import _ from 'lodash'
import { flatListFilterWithGroupSelected } from './util'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { ListProps, TreeListItem, ListApi } from './types'
import Item from './item'

const List = React.forwardRef<ListApi, ListProps>(
  (
    {
      flatList,
      groupSelected,
      onGroupSelect,
      selectedValues,
      onSelectValues,
      listHeight,
      listWidth,
      renderLeafItem,
      renderGroupItem,
      activeValue,
      onActiveValue,
      findValue,
      checkboxStatusMap,
      disabledCheckbox,
    },
    ref
  ) => {
    const refList = useRef<FixedSizeList>(null)

    const showFlatList = useMemo(() => {
      return flatListFilterWithGroupSelected(flatList, groupSelected)
    }, [flatList, groupSelected])

    useImperativeHandle(
      ref,
      () => {
        return {
          apiDoScrollToValue: (value: any) => {
            const index = _.findIndex(showFlatList, (v) => v.data.value === value)

            if (refList.current) {
              refList.current.scrollToItem(index)
            }
          },
        }
      },
      [showFlatList]
    )

    const Row: FC<ListChildComponentProps> = ({ index, style }) => {
      const flatItem = showFlatList[index]
      const status = checkboxStatusMap[flatItem.value]

      const handleActive = (item: TreeListItem) => {
        onActiveValue && onActiveValue(item.value, item)
      }

      const handleExpand = () => {
        onGroupSelect(_.xor(groupSelected, [flatItem.value]))
      }

      const handleCheck = () => {
        if (flatItem.isLeaf) {
          if (!status.checked) {
            onSelectValues(_.uniq(selectedValues.concat([flatItem.value])))
          } else {
            onSelectValues(_.difference(selectedValues, [flatItem.value]))
          }
        } else {
          if (!status.checked) {
            onSelectValues(_.uniq(selectedValues.concat(flatItem.leafValues)))
          } else {
            onSelectValues(_.difference(selectedValues, flatItem.leafValues))
          }
        }
      }

      return (
        <Item
          key={flatItem.data.value}
          flatItem={flatItem}
          expand={status.expand}
          onExpand={handleExpand}
          checked={status.checked}
          onCheck={handleCheck}
          indeterminate={status.indeterminate}
          style={style}
          renderLeafItem={renderLeafItem}
          renderGroupItem={renderGroupItem}
          active={flatItem.data.value === activeValue}
          onActive={handleActive}
          findActive={findValue === flatItem.data.value}
          disabledCheckbox={disabledCheckbox}
        />
      )
    }

    return (
      <FixedSizeList
        ref={refList}
        height={listHeight}
        width={listWidth}
        itemCount={showFlatList.length}
        itemSize={28}
      >
        {Row}
      </FixedSizeList>
    )
  }
)

export default List
