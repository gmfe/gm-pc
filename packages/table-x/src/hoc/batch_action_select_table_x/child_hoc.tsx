import React, { FC, ComponentType, useState, useEffect } from 'react'
import { TableXDataItem, TableXProps } from '../../base'
import { BatchActionBar, BatchActionBarItem } from '../../components'
import _ from 'lodash'
import { Value, BatchActionTableXChildProps } from './types'

// 注意，对比 batchActionSelectTableXHOC
// 1 没有 Select
// 2 多了 Child
// getTableXChild 本身要求 Table 被 selectTableXHOC 了
function batchActionTableXChildHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const BatchActionTableXChild: FC<Props & BatchActionTableXChildProps> = ({
    data,
    keyField = 'value',
    childKeyField = 'value',
    batchActions,
    batchActionBarPure,
    ...rest
  }) => {
    const getKey = (item: TableXDataItem) => {
      return item[keyField || 'value']
    }

    const getSubKey = (item: TableXDataItem) => {
      return item[childKeyField || 'value']
    }

    // BatchActionTableX 调用方不用传 selected onSelect，
    // 这里 keep 内部状态
    const [selected, setSelected] = useState<Value[]>([])
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)

    // 数据变化后更新 state
    useEffect(() => {
      if (selected.length !== 0) {
        setSelected([])
        setIsSelectAll(false)
      }
    }, [data])

    const handleSelect = (selected: Value[]) => {
      setSelected(selected)

      const ones = _.map(data, (v) => getKey(v))
      const oneSelected = _.filter(selected, (v) => ones.includes(v))
      // 当不满足的时候
      if (oneSelected.length < ones.length) {
        setIsSelectAll(false)
      }
    }

    const handleToggleSelectAll = (isSelectAll: boolean) => {
      setIsSelectAll(isSelectAll)

      // 选择当前页和选择所有页，都需要把当前选中
      const alls: any[] = []

      _.each(data, (v) => {
        alls.push(getKey(v))
        _.each(v.children, (vv) => {
          alls.push(getSubKey(vv))
        })
      })

      console.log(alls)

      setSelected(alls)
    }

    const handleClose = () => {
      setSelected([])
      setIsSelectAll(false)
    }

    const newBatchActions: BatchActionBarItem[] = _.map(
      _.filter(batchActions, (v) => v.show !== false),
      (v) => {
        return {
          children: v.children,
          onClick: () => {
            v.onAction(selected, isSelectAll)
          },
          getDisabled: v.getDisabled,
        }
      }
    )

    return (
      <Table
        {...(rest as Props)}
        keyField={keyField}
        data={data}
        selected={selected}
        onSelect={handleSelect}
        batchActionBar={
          selected.length > 0 && (
            <BatchActionBar
              isSelectAll={isSelectAll}
              selected={selected}
              count={selected.length}
              batchActions={newBatchActions}
              toggleSelectAll={handleToggleSelectAll}
              onClose={handleClose}
              pure={batchActionBarPure}
            />
          )
        }
      />
    )
  }

  return BatchActionTableXChild
}

export default batchActionTableXChildHOC
