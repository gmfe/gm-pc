import { CSSProperties, ReactNode, KeyboardEvent } from 'react'

/** 普通的数据格式 */
interface MoreSelectDataItem<V> {
  value: V
  text: string
  disabled?: boolean
  [key: string]: any
}

/** 分组的数据格式 */
interface MoreSelectGroupDataItem<V> {
  label: string | ReactNode
  children: MoreSelectDataItem<V>[]
}

interface MoreSelectCommonProps<V> {
  multiple?: boolean

  disabled?: boolean
  /** 单选禁止显示关闭按钮 */
  disabledClose?: boolean

  delay?: number
  searchPlaceholder?: string

  /** 过滤方式 */
  renderListFilterType?: 'default' | 'pinyin'

  placeholder?: string

  /** 自定义渲染已选择项 */
  renderSelected?(selected: MoreSelectDataItem<V>): ReactNode
  /** 自定义渲染列表项 */
  renderListItem?(value: MoreSelectDataItem<V>, index: number): ReactNode

  listHeight?: string
  isGroupList?: boolean
  popoverType?: 'focus' | 'realFocus'

  isInPopup?: boolean

  popupClassName?: string

  className?: string
  style?: CSSProperties
  children?: ReactNode

  /** 目前为了 keyboard */
  isKeyboard?: boolean
  onKeyDown?(event: KeyboardEvent): void
}

interface MoreSelectBaseProps<V> extends MoreSelectCommonProps<V> {
  data: MoreSelectGroupDataItem<V>[]
  selected: MoreSelectDataItem<V>[]
  onSelect(selected: MoreSelectDataItem<V>[]): void

  /** 搜索回调 */
  onSearch?(searchWord: string, data: MoreSelectGroupDataItem<V>[]): Promise<void> | void

  /** 自定义搜索过滤展示的数据 */
  renderListFilter?(
    data: MoreSelectGroupDataItem<V>[],
    searchValue: string
  ): MoreSelectGroupDataItem<V>[]
}

type MoreSelectData<V> = MoreSelectDataItem<V>[] | MoreSelectGroupDataItem<V>[]
type MoreSelectSelected<V> = MoreSelectDataItem<V>[] | MoreSelectDataItem<V>

interface MoreSelectProps<V> extends MoreSelectCommonProps<V> {
  data?: MoreSelectData<V>
  selected?: MoreSelectSelected<V>
  onSelect?(selected?: MoreSelectSelected<V>): void

  /** 搜索回调 */
  onSearch?(searchWord: string, data: MoreSelectData<V>): Promise<void> | void

  /** 自定义搜索过滤展示的数据 */
  renderListFilter?(data: MoreSelectData<V>, searchValue: string): MoreSelectData<V>
}

export type {
  MoreSelectGroupDataItem,
  MoreSelectDataItem,
  MoreSelectBaseProps,
  MoreSelectProps,
}
