/*
 * @Description: 业务列表、半自动请求
 */
import React, { useState, useImperativeHandle } from 'react'
import { BoxTable, BoxTableInfo } from '@gm-pc/react'
import { Table, TableProps, SortsType, useTableRef } from '@gm-pc/table-x'

import { usePagination, useUpdateEffect } from '@gm-common/hooks'

import TableTotalText from './table_total_text'

import { TableListProps } from './types'
import { handleParams } from './util'

export function TableList<D extends object = any>({
  totalTextData,
  filter,
  filterProp,
  isPagination = true,
  info,
  action,
  headerProps,
  isUpdateEffect,
  isHeaderSort,
  isFilterSpread = true,
  paginationOptions,
  tableRef,
  pagination,
  service,
  formatData = (data) => data.data,
  ...res
}: TableListProps<D>) {
  const {
    paging,
    runChangePaging,
    run,
    refresh,
    loading,
    data = {},
  } = usePagination<any>(service, { ...paginationOptions }, false)

  const [sorts, setSorts] = useState<SortsType>({})
  const _tableRef = useTableRef()

  let tableData = formatData(data)
  if (!Array.isArray(tableData)) {
    tableData = []
  }

  useUpdateEffect(
    () => {
      // 如果没传service，则return
      if (!service) {
        return
      }
      const params = handleParams({
        filter,
        filterProp,
        isFilterSpread,
        isHeaderSort,
        sorts,
      })
      run(params)
    },
    [filter, filterProp, sorts, isHeaderSort, isFilterSpread, service],
    isUpdateEffect
  )

  useImperativeHandle(tableRef, () => ({
    ..._tableRef.current,
    refresh,
  }))
  const onHeadersSort: TableProps['onHeadersSort'] = (sorts) => {
    setSorts(sorts)
  }

  const boxTableProps = {
    pagination:
      pagination || (isPagination ? { paging, onChange: runChangePaging } : undefined),

    info:
      info ??
      (totalTextData ? (
        <BoxTableInfo>
          <TableTotalText data={totalTextData} />
        </BoxTableInfo>
      ) : undefined),
    action,
    headerProps,
  }

  const tableProps = ({
    data: tableData,
    loading,
    onHeadersSort,
    ...res,
    tableRef: _tableRef,
  } as unknown) as TableProps<D>
  return (
    <BoxTable {...boxTableProps}>
      <Table {...tableProps} />
    </BoxTable>
  )
}
