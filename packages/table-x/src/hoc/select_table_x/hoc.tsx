import React, { ComponentType, FC, useMemo, useCallback } from 'react'
import { SelectTableXProps, SelectTableXValue } from './types'
import { TableXColumn, TableXDataItem, TableXProps } from '../../base/types'
import SelectTableXContext, { SelectTableXContextOptions } from './context'
import { Flex } from '@gm-pc/react'
import { TABLE_X, TABLE_X_SELECT_ID } from '../../utils'
import SelectHeader from './header'
import SelectCell from './cell'
import { CellProps } from 'react-table'
import _ from 'lodash'

const returnFalse = () => false

function getNewColumns(
  columns: TableXColumn[],
  fixedSelect: boolean,
  selectType: 'checkbox' | 'radio',
  keyField: string,
  isSelectorDisable: (item: TableXDataItem) => boolean
): TableXColumn[] {
  const selectColumn: TableXColumn = {
    id: TABLE_X_SELECT_ID,
    width: TABLE_X.WIDTH_FUN,
    maxWidth: TABLE_X.WIDTH_FUN,
    fixed: fixedSelect ? 'left' : undefined,
    Header: () => <SelectHeader selectType={selectType} />,
    // @ts-ignore
    Cell: ({ row }: CellProps<any>) => (
      <SelectCell
        keyField={keyField}
        selectType={selectType}
        row={row}
        isSelectorDisable={isSelectorDisable}
      />
    ),
  }

  return [selectColumn, ...columns]
}

function selectTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const SelectTableX: FC<Props & SelectTableXProps> = ({
    selected = [],
    onSelect,
    batchActionBar,
    isSelectorDisable = returnFalse,
    selectType = 'checkbox',
    keyField = 'value',
    fixedSelect,
    columns,
    data,
    rowSelect,
    ...rest
  }) => {
    // 不响应 isSelectorDisable
    const canSelectData = useMemo(() => {
      return data.filter((item) => !isSelectorDisable(item))
    }, [data])

    // 不响应 isSelectorDisable
    const newColumns = useMemo(() => {
      return getNewColumns(
        columns,
        !!fixedSelect,
        selectType,
        keyField,
        isSelectorDisable
      )
    }, [columns])

    const isSelectAll = canSelectData.every((can) => selected?.includes(can[keyField]))

    const handleSelect = (
      selected: SelectTableXValue[],
      isSelected: boolean,
      index: number
    ): void => {
      onSelect(selected, isSelected, index)
    }

    const handleSelectAll = (): void => {
      if (isSelectAll) {
        onSelect(
          selected.filter(
            (select) => !canSelectData.some((can) => can[keyField] === select)
          ),
          false
        )
      } else {
        onSelect(_.uniq(canSelectData.map((v) => v[keyField]).concat(selected)), true)
      }
    }
    // 行选择
    const onRowSelect: SelectTableXContextOptions['onRowSelect'] = useCallback(
      (select, i) => {
        if (rowSelect) {
          const tempSelected = [...selected]
          const index = tempSelected.indexOf(select)
          if (!~index) {
            tempSelected.push(select)
            onSelect(tempSelected, true, i)
          } else {
            tempSelected.splice(index, 1)
            onSelect(tempSelected, false, i)
          }
        }
      },
      [rowSelect, selected, onSelect]
    )
    return (
      <SelectTableXContext.Provider
        value={{
          selected,
          isSelectAll,
          onSelect: handleSelect,
          onSelectAll: handleSelectAll,
          onRowSelect,
        }}
      >
        <div className='gm-table-x-select-container'>
          {batchActionBar && (
            <div className='gm-table-x-select-batch-action-bar-container'>
              <Flex column justifyCenter className='gm-table-x-select-batch-action-bar'>
                {batchActionBar}
              </Flex>
            </div>
          )}
          <Table
            {...(rest as Props)}
            columns={newColumns}
            data={data}
            keyField={keyField}
          />
        </div>
      </SelectTableXContext.Provider>
    )
  }
  return SelectTableX
}

export default selectTableXHOC
