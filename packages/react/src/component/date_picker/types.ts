import { CSSProperties, ReactNode } from 'react'

interface TimeLimit {
  defaultTime?: Date
  disabledSpan?(time: Date, date?: Date | { begin?: Date; end?: Date }): boolean
  timeSpan?: number
}

interface DatePickerProps {
  /* 选择的日期 */
  date?: Date | null
  /* 选择日期的回调函数 */
  onChange(date: Date | null): void
  /* 展示栏placeholder */
  placeholder?: string
  /* 禁用 */
  disabled?: boolean
  /* 最小可选日期 */
  min?: Date
  /* 最大可选日期 */
  max?: Date
  /* 自定义禁用日期，优先级高于min，max */
  disabledDate?(date: Date): boolean
  /* 自定义日期展示格式 */
  renderDate?(date: Date): ReactNode
  style?: CSSProperties
  className?: string
  onKeyDown?(event: KeyboardEvent): void
  /* 时间选择 */
  enabledTimeSelect?: boolean
  /* 时间选择限制 */
  timeLimit?: TimeLimit
}

export type { TimeLimit, DatePickerProps }
