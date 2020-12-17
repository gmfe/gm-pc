import React, { FC, forwardRef } from 'react'
import _Bar from './core'
import useChart from '../../common/hooks/useChart'
import TableChart from './components/table_chart'
import { ChartProps, ChartOptions } from '../../types/common'
import './index.less'

const Bar: FC<ChartProps> = forwardRef((props, ref) => {
  const { container } = useChart(_Bar, props)

  if (props.options.adjust === 'table') {
    return <TableChart ref={container} options={props.options} data={props.data} />
  }

  return <div ref={container} />
})

export { Bar }
