import React, { FC, ComponentType, useState, useEffect } from 'react'
import { TableXProps } from '../../base'
import { BatchActionBar, BatchActionBarItem } from '../../components'
import _ from 'lodash'
import { selectTableXHOC } from '../select_table_x'
import { Value, BatchActionSelectTableXProps } from './types'

function batchActionSelectTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  // 基于 SelectTableX
  const SelectTable = selectTableXHOC(Table)

  const BatchActionSelectTableX: FC<Props & BatchActionSelectTableXProps> = ({
    data,
    keyField = 'value',
    batchActions,
    batchActionBarPure,
    ...rest
  }) => {
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
      // 当不满足的时候
      if (selected.length < data.length) {
        setIsSelectAll(false)
      }
    }

    const handleToggleSelectAll = (isSelectAll: boolean) => {
      setIsSelectAll(isSelectAll)
      // 选择当前页和选择所有页，都需要把当前选中
      setSelected(_.map(data, (v) => v[keyField]))
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
      <SelectTable
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

  return BatchActionSelectTableX
}

export default batchActionSelectTableXHOC
