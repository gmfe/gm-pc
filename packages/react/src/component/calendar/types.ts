import { CSSProperties, KeyboardEvent } from 'react'
import { Moment } from 'moment'

type DisabledYearAndMonth = 'left' | 'right'

interface RangeCalendarProps {
  /* 开始日期 */
  begin?: Date | null
  /* 结束日期 */
  end?: Date | null
  /* 日期选中回调函数 */
  onSelect?(begin: Date | null, end: Date | null): void
  /* 键盘 和 日期显示的月份 */
  willActiveSelected?: Date
  onWillActiveSelected?(value: Date): void
  /* 可选最小日期 */
  min?: Date
  /* 可选最大日期 */
  max?: Date
  /* 自定义日期可选，优先度大于max，min */
  disabledDate?(date: Date, selected: { begin?: Date; end?: Date }): boolean
  /* 禁用年 / 月 切换按钮，可以通过 onWillActiveSelected 变更此设置 */
  disabledYearAndMonth?: DisabledYearAndMonth
  className?: string
  style?: CSSProperties
  /* 当前鼠标hover日期 */
  hoverDay?: Moment | null
  /* 鼠标hover回调 */
  onHoverDay?(value: Moment | null): void
  /* 键盘用 */
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
}

interface CalendarProps {
  /* 日期 */
  selected?: Date | null
  /* 日期选中回调函数 */
  onSelect?(selected: Date): void
  /* 键盘 */
  willActiveSelected?: Date
  onWillActiveSelected?(selected: Date): void
  /* 最小可选日期 */
  min?: Date
  /* 最大可选日期 */
  max?: Date
  /* 自定义可选日期，优先度大于min，max */
  disabledDate?(date: Date): boolean
  className?: string
  style?: CSSProperties
  /* 全键盘 */
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
}

export type { DisabledYearAndMonth, RangeCalendarProps, CalendarProps }
