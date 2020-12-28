import React, { FC } from 'react'

import { Flex } from '../flex'
import DivTd from './div_td'

import { ISimpleSummaryProps } from './types'

const RowSummary: FC<ISimpleSummaryProps> = (props) => {
  const { summarys } = props
  return (
    <tr className='gm-summary-row'>
      <td colSpan={99999}>
        <Flex>
          {summarys.map((summary, index) => {
            return (
              <DivTd
                {...summary}
                width={summary.width ?? `${100 / summarys.length}%`}
                key={index}
              />
            )
          })}
        </Flex>
      </td>
    </tr>
  )
}

export default RowSummary
