import React, { ComponentType, FC, ReactElement } from 'react'
import _ from 'lodash'
import { TableXChildProps, TableXChildSelectedTree } from './types'
import { TableXDataItem, TableXProps } from '../base'
import { SelectTableXProps, SelectTableXValue } from '../hoc/select_table_x/types'
import { TableXRow } from '../base/types'
import { ExpandTableXProps } from '../hoc/expand_table_x'
import { SubTableXProps } from '../hoc/sub_table_x'

// 请确保
// OneTable 含 selectTableV2HOC(expandTableHOC(Table))
// SubTable 含 selectTableV2HOC(subTableHOC(Table))

interface OneTableX extends TableXProps, SelectTableXProps, ExpandTableXProps {}

interface SubTableX extends TableXProps, SelectTableXProps, SubTableXProps {}

function getTableXChild<T extends OneTableX = OneTableX, V extends SubTableX = OneTableX>(
  OneTable: ComponentType<T>,
  SubTable: ComponentType<V>
) {
  const TableXChild: FC<TableXChildProps> = ({
    data,
    selected,
    onSelect,
    keyField,
    columns,
    subProps,
    batchActionBar,
    ...rest
  }) => {
    const getKey = (item: TableXDataItem) => {
      return item[keyField || 'value']
    }

    const getSubKey = (item: TableXDataItem) => {
      return item[subProps.keyField || 'value']
    }

    const afterSelect = (selected: SelectTableXValue[]) => {
      const selectedTree: TableXChildSelectedTree = {}
      _.each(data, (one) => {
        const oneKey = getKey(one)

        const subKeys: any[] = []
        _.each(one.children, (sub) => {
          const subKey = getSubKey(sub)
          if (selected.includes(subKey)) {
            subKeys.push(subKey)
          }
        })
        selectedTree[oneKey] = subKeys
      })

      onSelect(selected, selectedTree)
    }

    const handleSelect = (_oneSelected: SelectTableXValue[]) => {
      // 带上 sub selected
      let newSelected = _oneSelected.concat(subSelected)

      // 这样获取取消选择的
      const cancelSelected = _.difference(oneSelected, _oneSelected)

      _.each(data, (item) => {
        const key = getKey(item)
        if (_oneSelected.includes(key)) {
          const subs = _.map(item.children, (v) => getSubKey(v))
          newSelected = newSelected.concat(subs)
        } else if (cancelSelected.includes(key)) {
          // 取消选择，子也需要取消
          const subs = _.map(item.children, (v) => getSubKey(v))
          newSelected = _.difference(newSelected, subs)
        }
      })

      // newSelected 会有重复的，去下重
      newSelected = _.uniq(newSelected)

      afterSelect(newSelected)
    }

    // 全选简单
    const handleSelectAll = (selectAll: boolean) => {
      if (!selectAll) {
        afterSelect([])
        return
      }

      const newSelected: SelectTableXValue[] = []
      _.each(data, (one) => {
        newSelected.push(getKey(one))
        _.each(one.children, (sub) => {
          newSelected.push(getSubKey(sub))
        })
      })

      afterSelect(newSelected)
    }

    // 重要 只那属于一层的给一层
    const ones = _.map(data, (item) => getKey(item))
    const oneSelected = _.filter(selected, (v) => ones.includes(v))
    const subSelected = _.difference(selected, oneSelected)

    return (
      <OneTable
        {...(rest as T)}
        data={data}
        selected={oneSelected}
        onSelect={handleSelect}
        keyField={keyField}
        columns={columns}
        batchActionBar={
          batchActionBar
            ? React.cloneElement(batchActionBar as ReactElement, {
                onSelectAll: handleSelectAll,
              })
            : null
        }
        SubComponent={(row: TableXRow) => {
          const subData = data[row.index].children

          // 只那属于二层的给二层
          // 重要
          const subs = _.map(subData, (item) => getSubKey(item))
          const subSelected = _.filter(selected, (v) => subs.includes(v))

          const handleSubSelect = (subSelected: SelectTableXValue[]) => {
            // 拿出属于该 sub 的部分
            let newSelected = _.filter(selected, (v) => !subs.includes(v))
            newSelected = newSelected.concat(subSelected)

            // 要更新下父亲的选择项
            const pKey = getKey(data[row.index])
            if (subs.length === subSelected.length) {
              newSelected.push(pKey)
            } else {
              newSelected = _.without(newSelected, pKey)
            }

            // newSelected 可能会有重复，去下重
            newSelected = _.uniq(newSelected)

            afterSelect(newSelected)
          }

          const newColumns = _.map(subProps.columns, (v) => {
            let newColumn = v
            if (v.Cell) {
              newColumn = {
                ...v,
                Cell: (subCellProps) => {
                  return v.Cell ? v.Cell(subCellProps, row) : null
                },
              }
            }

            return newColumn
          })

          return (
            <SubTable
              {...(subProps as V)}
              columns={newColumns}
              data={subData}
              selected={subSelected}
              onSelect={(selected: SelectTableXValue[]) => handleSubSelect(selected)}
            />
          )
        }}
      />
    )
  }

  return TableXChild
}

export default getTableXChild
