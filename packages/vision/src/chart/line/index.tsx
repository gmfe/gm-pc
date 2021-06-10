import React, { FC, forwardRef, useRef, useEffect } from 'react'
import _Line from './core'
import useChart from '../../common/hooks/useChart'
import { ChartProps, ChartOptions } from '../../types/common'

const Line: FC<ChartProps> = forwardRef((props, ref) => {
  const { container } = useChart(_Line, props)

  return <div ref={container} />
})

export { Line }
