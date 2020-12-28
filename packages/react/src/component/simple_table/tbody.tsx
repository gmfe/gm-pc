/*
 * @Description: 表身
 */
import React, { Fragment } from 'react'

import Row from './row'
import RowSummary from './row_summary'
import { devWarnForHook, warn } from '@gm-common/tool'

import { ISimpleTbodyProps } from './types'

function Tbody<OriginalType>(props: ISimpleTbodyProps<OriginalType>) {
  const { rowKey, columns, data, rowSummary, allSummary } = props
  return (
    <tbody>
      {data.map((original, rowIndex) => {
        const key = (original as any)[rowKey]
        devWarnForHook(() => {
          if (key === undefined) {
            warn('rowKey没有对应的值')
          }
        })
        return (
          <Fragment key={key}>
            <Row<OriginalType>
              rowIndex={rowIndex}
              original={original}
              columns={columns}
            />
            {rowSummary && <RowSummary {...rowSummary(original, rowIndex)} />}
          </Fragment>
        )
      })}
      {allSummary && <RowSummary {...allSummary(data)} />}
    </tbody>
  )
}

export default Tbody
