import React, { FC, CSSProperties, memo } from 'react'
import { UseTableInstanceProps } from 'react-table'
import { areEqual } from 'react-window'
import Tr from '../base/tr'
import { TableXTrProps, TableXRow } from '../base/types'

export interface RenderRowProps {
  data: Pick<UseTableInstanceProps<any>, 'rows' | 'prepareRow'> &
    Pick<
      TableXTrProps,
      | 'SubComponent'
      | 'isTrDisable'
      | 'isTrHighlight'
      | 'trHighlightClass'
      | 'keyField'
      | 'totalWidth'
    >
  index?: number
  style?: CSSProperties
  isMap?: boolean
}
const RenderRow: FC<RenderRowProps> = ({ data, index, style, isMap }: RenderRowProps) => {
  if (!isMap && index === 0) {
    // @ts-ignore
    return <div style={style} />
  }
  if (index !== undefined) {
    index = index - 1
  }
  const {
    prepareRow,
    rows,
    SubComponent,
    keyField,
    isTrDisable,
    isTrHighlight,
    trHighlightClass,
    totalWidth,
  } = data

  const _renderRow = (row: TableXRow) => {
    prepareRow(row)
    return (
      <Tr
        key={row.index}
        totalWidth={totalWidth}
        row={row as TableXRow}
        SubComponent={SubComponent}
        keyField={keyField as never}
        // @ts-ignore
        style={style}
        isTrDisable={isTrDisable}
        isTrHighlight={isTrHighlight}
        trHighlightClass={trHighlightClass}
      />
    )
  }
  const _rows = (isMap ? rows : [rows[index!]]) as TableXRow[]
  return <>{_rows.map(_renderRow)}</>
}

export default memo(RenderRow, areEqual)
