import React, { ComponentType, FC, useEffect } from 'react'
import SortableJS from 'sortablejs'
import { TableXDataItem, TableXPropsType } from '../../base'
import _ from 'lodash'

type SortableTableXProps = TableXPropsType & {
  onSortChange(data: TableXDataItem[]): void
}
/**
 * 请使用Table并配置isSort
 * @deprecated
 */
function sortableTableXHOC(Table: ComponentType<TableXPropsType>) {
  const SortableTableX: FC<SortableTableXProps> = ({
    id,
    data,
    onSortChange,
    keyField = 'value',
    ...rest
  }) => {
    id = id ?? `id${+new Date()}${String(Math.random()).slice(2)}`

    useEffect(() => {
      const target: HTMLElement = document.querySelector(
        `#${id} .gm-table-x-tbody`
      ) as HTMLElement
      const sortable = new SortableJS(target, {
        animation: 150,
        onStart() {
          target.classList.add('gm-table-x-sortable-active')
        },
        onEnd() {
          target.classList.remove('gm-table-x-sortable-active')
        },
        onUpdate: () => {
          const newIds = sortable.toArray()
          const newData = _.sortBy(data.slice(), (v) =>
            newIds.indexOf((v[keyField] as any) as string)
          )
          onSortChange(newData)
        },
      })
      return () => {
        sortable.destroy()
      }
    }, [data])

    return <Table {...rest} id={id} data={data} keyField={keyField} />
  }
  return SortableTableX
}

export default sortableTableXHOC
export type { SortableTableXProps }
