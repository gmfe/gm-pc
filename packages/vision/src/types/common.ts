import { Chart, Geometry } from '@antv/g2'

export interface ChartOptions {
  /** 图表宽度 */
  width?: number
  /** 图表高度 */
  height?: number
  /** 自适应宽高 */
  autoFit?: boolean
  /** 边距 */
  padding?: number
  /** 主题 */
  theme?: string
  xFieldName?: string
  yFieldName?: Array<any>
  position: string
  label?: boolean | ((data: Record<string, any>) => string)
  adjust?: string
  color: string
  coordinate?: {
    actions: 'transpose' | string
    [key: string]: any
  }
  [key: string]: any
}

/** 图表实例配置的参数 */
export interface Instance {
  geometry?: Geometry
  chart: Chart
  options: ChartOptions
}

export interface useChartOptions {
  options: ChartOptions
}

export interface ChartProps {
  data: Record<string, any>[]
  options: ChartOptions
}
