import { CSSProperties, ReactNode, KeyboardEvent } from 'react'

type Value = any

/* 普通的数据格式 */
interface MoreSelectDataItem {
  value: Value
  text: string
  disabled?: boolean
  [key: string]: any
}

/* 分组的数据格式 */
interface MoreSelectGroupDataItem {
  label: string | ReactNode
  children: MoreSelectDataItem[]
}

interface MoreSelectCommonProps {
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
  renderSelected?(selected: MoreSelectDataItem): ReactNode
  /** 自定义渲染列表项 */
  renderListItem?(value: MoreSelectDataItem, index: number): ReactNode

  listHeight?: string
  isGroupList?: boolean
  popoverType?: 'focus' | 'realFocus'

  isInPopup?: boolean

  popupClassName?: string

  className?: string
  style?: CSSProperties

  /** 目前为了 keyboard */
  isKeyboard?: boolean
  onKeyDown?(event: KeyboardEvent): void
}

interface MoreSelectBaseProps extends MoreSelectCommonProps {
  data: MoreSelectGroupDataItem[]
  selected: MoreSelectDataItem[]
  onSelect(selected: MoreSelectDataItem[]): void

  /** 搜索回调 */
  onSearch?(searchWord: string, data: MoreSelectGroupDataItem[]): Promise<void> | void

  /** 自定义搜索过滤展示的数据 */
  renderListFilter?(
    data: MoreSelectGroupDataItem[],
    searchValue: string
  ): MoreSelectGroupDataItem[]
}

type MoreSelectData = MoreSelectDataItem[] | MoreSelectGroupDataItem[]
type MoreSelectSelected = MoreSelectDataItem[] | MoreSelectDataItem

interface MoreSelectProps extends MoreSelectCommonProps {
  data: MoreSelectData
  selected?: MoreSelectSelected
  onSelect(selected?: MoreSelectSelected): void

  /** 搜索回调 */
  onSearch?(searchWord: string, data: MoreSelectData): Promise<void> | void

  /** 自定义搜索过滤展示的数据 */
  renderListFilter?(data: MoreSelectData, searchValue: string): MoreSelectData
}

export type {
  Value,
  MoreSelectGroupDataItem,
  MoreSelectDataItem,
  MoreSelectBaseProps,
  MoreSelectProps,
}
