import { ReactNode, CSSProperties } from 'react'
import { Moment } from 'moment'

interface TimeSpanProps {
  /** 最小可选时间，默认一天的开始时间 */
  min?: Date
  /** 最大可选时间，默认一天的结束时间 */
  max?: Date
  /** 禁用时间函数，优先级大于min，max */
  disabledSpan?(date: Date): boolean
  /** 时间跨度，默认30分钟 */
  span?: number
  /** 选中时间 */
  time?: Date
  /** 渲染选中 */
  renderItem?(date: Date): ReactNode
  /** 选中回调 */
  onChange?(date: Date): void
  /** 自定义开始时间，默认从00:00开始 */
  beginTime?: Date
  /** 自定义结束使劲啊 */
  endTime?: Date
  /** 内部展示24:00用 */
  enabledEndTimeOfDay?: boolean
}

interface TimeSpanPickerProps {
  /** 选择时间 */
  date: Date
  /** 选择回调 */
  onChange(date: Date): void
  disabled?: boolean
  /** 最小可选时间，默认一天开始时间 */
  min?: Date
  /** 最大可选时间，默认一天结束时间 */
  max?: Date
  /** 定义时间跨度，默认为30分钟 */
  span?: number
  /** 自定义禁用时间，优先级高于min，max */
  disabledSpan?(date: Date): boolean
  /** 渲染时间文本展示格式，默认为 HH:mm */
  renderItem?(date: Date): ReactNode
  /** 自定义渲染开始时间，默认为00:00 */
  beginTime?: Date
  /** 自定义渲染结束时间 */
  endTime?: Date
  className?: string
  style?: CSSProperties
  isInPopup?: boolean
  /** 内部为了展示24:00 */
  enabledEndTimeOfDay?: boolean
}

interface GetTime {
  (time?: Date): Moment | null
}

export type { TimeSpanProps, TimeSpanPickerProps, GetTime }
