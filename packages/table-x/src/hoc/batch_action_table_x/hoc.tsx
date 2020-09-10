import React, { FC, ComponentType, useState, ReactNode } from 'react'
import { TableXProps } from '../../base'
import TableXBatchActionBar from '../select_table_x/batch_action_bar'
import _ from 'lodash'
import { selectTableXHOC } from '../select_table_x'

interface Table extends TableXProps {}

type Value = any

interface BatchActionTableXBatchActionsItem {
  /** 如果需要 dataId，用 ReactNode 调用方自己弄 */
  children: string | ReactNode
  onAction(selected: Value[], isSelectAll: boolean): void
  show?: boolean
}

interface BatchActionTableX {
  /** 重新定义 batchActions */
  batchActions: BatchActionTableXBatchActionsItem[]
  batchActionBarPure?: boolean
}

function batchActionTableXHOC<Props extends Table = Table>(Table: ComponentType<Props>) {
  const SelectTable = selectTableXHOC(Table)

  const BatchActionTable: FC<Props & BatchActionTableX> = ({
    data,
    keyField = 'value',
    batchActions,
    batchActionBarPure,
    ...rest
  }) => {
    const [selected, setSelected] = useState<Value[]>([])
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)

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

    // @todo
    const newBatchActions: any = _.map(
      _.filter(batchActions, (v) => v.show !== false),
      (v) => {
        return {
          name: v.children,
          type: 'business',
          onClick: () => {
            v.onAction(selected, isSelectAll)
          },
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
            <TableXBatchActionBar
              isSelectAll={isSelectAll}
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

  return BatchActionTable
}

export default batchActionTableXHOC
export type { BatchActionTableX, BatchActionTableXBatchActionsItem }
