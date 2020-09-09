import React, { ComponentType, FC, useMemo } from 'react'
import { SelectTableXProps, SelectTableXValue } from './types'
import {
  TableXColumn,
  TableXDataItem,
  TableXPropsType,
} from '../../base/types'
import SelectTableXContext from './context'
import { Flex } from '@gm-pc/react'
import { TABLE_X, TABLE_X_SELECT_ID } from '../../utils'
import SelectHeader from './header'
import SelectCell from './cell'
import { CellProps } from 'react-table'

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

function selectTableXHOC(Table: ComponentType<TableXPropsType>) {
  const SelectTableX: FC<SelectTableXProps> = ({
    selected,
    onSelect,
    batchActionBar,
    isSelectorDisable = returnFalse,
    selectType = 'checkbox',
    keyField = 'value',
    fixedSelect,
    columns,
    data,
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

    const isSelectAll = !!selected.length && selected.length === canSelectData.length

    const handleSelect = (selected: SelectTableXValue[]): void => {
      onSelect(selected)
    }

    const handleSelectAll = (): void => {
      onSelect(!isSelectAll ? canSelectData.map((v) => v[keyField]) : [])
    }

    return (
      <SelectTableXContext.Provider
        value={{
          selected,
          isSelectAll,
          onSelect: handleSelect,
          onSelectAll: handleSelectAll,
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
          <Table {...rest} columns={newColumns} data={data} />
        </div>
      </SelectTableXContext.Provider>
    )
  }
  return SelectTableX
}

export default selectTableXHOC
