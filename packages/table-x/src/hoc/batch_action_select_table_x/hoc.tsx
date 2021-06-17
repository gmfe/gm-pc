import React, { FC, ComponentType, useState, useEffect } from 'react'
import { TableXProps } from '../../base'
import { BatchActionBar } from '../../components'
import _ from 'lodash'
import { selectTableXHOC, SelectTableXProps } from '../select_table_x'
import { Value, BatchActionSelectTableXProps } from './types'
/**
 * 请使用Table并配置isBatchSelect
 * @deprecated
 */
function batchActionSelectTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  // 基于 SelectTableX
  const SelectTable = selectTableXHOC(Table)

  const BatchActionSelectTableX: FC<
    Props & BatchActionSelectTableXProps & SelectTableXProps
  > = ({ data, keyField = 'value', batchActions, batchActionBarPure, ...rest }) => {
    // BatchActionSelectTableX 调用方不用传 selected onSelect，
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
      // 当不满足的时候
      if (selected.length < data.length) {
        setIsSelectAll(false)
      }
    }

    const handleToggleSelectAll = (isSelectAll: boolean) => {
      setIsSelectAll(isSelectAll)
      // 选择当前页和选择所有页，都需要把当前选中
      setSelected(
        _.map(
          data.filter((item) => {
            const { isSelectorDisable } = rest
            if (isSelectorDisable) {
              return !isSelectorDisable(item)
            }
            return true
          }),
          (v) => v[keyField]
        )
      )
    }

    const handleClose = () => {
      setSelected([])
      setIsSelectAll(false)
    }

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
              batchActions={batchActions}
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
