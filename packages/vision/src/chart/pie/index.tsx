import React, { FC, forwardRef } from 'react'
import _Pie from './core'
import useChart from '../../common/hooks/useChart'
import { ChartProps } from '../../types/common'

const Pie: FC<ChartProps> = forwardRef((props, ref) => {
  const { container } = useChart(_Pie, props)

  return <div ref={container} />
})

export { Pie }
