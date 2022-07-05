import { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { ListDataItem } from '../../types'

interface SelectProps<V> {
  data?: ListDataItem<V>[]
  value?: V
  /** 默认 {value: 0, text: '全部'} */
  all?: boolean | { value?: V; text?: string }
  onChange?(selected: V): void
  disabled?: boolean
  renderItem?(item: ListDataItem<V>, index: number): ReactNode
  renderSelected?(selected: ListDataItem<V>): ReactNode
  clean?: boolean
  popoverType?: 'focus' | 'realFocus'
  isInPopup?: boolean
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties
  placeholder?: string
  /**
   * 在下拉选项最后自定义内容
   *
   * 注意：点击自定义内容时，会将浮层关闭。
   * 你可以在自定义内容的事件处理函数中添加 `e.preventDefault()` 来阻止这个行为。
   */
  addonLast?: ReactNode
}

export type { SelectProps }
