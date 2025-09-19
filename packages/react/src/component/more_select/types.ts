import { Popover } from '@gm-pc/react'
import { CSSProperties, ReactNode, KeyboardEvent } from 'react'

/** 普通的数据格式 */
interface MoreSelectDataItem<V extends string | number = string> {
  value: V
  text: string
  disabled?: boolean
  [key: string]: any
}

/** 分组的数据格式 */
interface MoreSelectGroupDataItem<V extends string | number = string> {
  label: string | ReactNode
  children: MoreSelectDataItem<V>[]
}

interface MoreSelectCommonProps<V extends string | number = string> {
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

  /** 自定义popup底部渲染 */
  renderCustomizedBottom?(ref: React.RefObject<Popover>): ReactNode

  /**
   * 自定义“空状态”渲染
   *
   * 若函数返回 undefined 则使用默认的空状态
   */
  renderEmpty?(searchValue?: string): ReactNode

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

interface MoreSelectBaseProps<V extends string | number = string>
  extends MoreSelectCommonProps<V> {
  data: MoreSelectGroupDataItem<V>[]
  selected: MoreSelectDataItem<V>[]
  onSelect(selected: MoreSelectDataItem<V>[]): void

  /** 搜索回调 */
  onSearch?(searchWord: string, data: MoreSelectGroupDataItem<V>[]): Promise<void> | void
  /** 点击回调 */
  onClick?(selected: MoreSelectSelected<V>[]): void

  /** 自定义搜索过滤展示的数据 */
  renderListFilter?(
    data: MoreSelectGroupDataItem<V>[],
    searchValue: string
  ): MoreSelectGroupDataItem<V>[]
  /** 是否在active的时候搜索，订单业务相关，searchValue放在localstorage */
  searchOnActive?: boolean
  /** 是否用select */
  isSameAntd?: boolean
}

type MoreSelectData<V extends string | number = string> =
  | MoreSelectDataItem<V>[]
  | MoreSelectGroupDataItem<V>[]
type MoreSelectSelected<V extends string | number = string> =
  | MoreSelectDataItem<V>[]
  | MoreSelectDataItem<V>

interface MoreSelectProps<V extends string | number = string>
  extends MoreSelectCommonProps<V>,
    Pick<MoreSelectBaseProps, 'searchOnActive'> {
  data?: MoreSelectData<V>
  selected?: MoreSelectSelected<V>
  value?: V | V[]
  onSelect?(selected?: MoreSelectSelected<V>): void
  onChange?(value: V | V[]): void
  /** 搜索回调 */
  onSearch?(searchWord: string, data: MoreSelectData<V>): Promise<void> | void
  /** 点击回调 */
  onClick?(selected: MoreSelectSelected<V>[]): void

  /** 自定义搜索过滤展示的数据 */
  renderListFilter?(data: MoreSelectData<V>, searchValue: string): MoreSelectData<V>
}

export type {
  MoreSelectGroupDataItem,
  MoreSelectDataItem,
  MoreSelectBaseProps,
  MoreSelectProps,
}
