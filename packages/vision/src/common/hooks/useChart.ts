import { useEffect, useRef } from 'react'
import { Base } from '../../chart/base/index'
import { ChartOptions, ChartProps } from '../../types/common'
import _ from 'lodash'

function useChart<T extends Base>(ChartClass: any, props: ChartProps) {
  const container = useRef<HTMLDivElement>(null)
  const chart = useRef<T>(null!)
  const chartOptions = useRef<ChartOptions>(null!)
  useEffect(() => {
    if (container && !container.current) {
      return
    }

    const instance: T = new ChartClass(container.current, {
      data: props.data,
      ...props.options,
    })
    chart.current = instance
    instance.render()
  }, [])

  useEffect(() => {
    if (chart.current && !_.isEqual(chartOptions.current, props.options)) {
      chart.current.updateOptions(props.options)
      chartOptions.current = props.options
    }
  }, [props.options])

  useEffect(() => {
    chart.current.updateData(props.data)
  }, [props.data])

  return {
    container,
    chart,
  }
}

export default useChart
