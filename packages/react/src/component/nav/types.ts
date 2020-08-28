import { CSSProperties, ReactNode } from 'react'

interface NavDataLevel3 {
  link: string
  name: string
}

interface NavDataLevel2 {
  link: string
  name: string
  sub: NavDataLevel3[]
  style?: CSSProperties
}

interface NavData {
  icon?: ReactNode
  link: string
  name: string
  sub: NavDataLevel2[]
}

interface NavProps {
  logo?: ReactNode
  /** 三级菜单 没有sub就没有浮层 */
  data: NavData[]
  /** pathname 会匹配到第三级的 link */
  selected: string
  /** 如果是选中一二级，会直接返回改分级下第三级的 item */
  onSelect(data: NavDataLevel3): void
  /** 控制 浮层的线上，如商品库传 merchandise */
  showActive?: string
  other?: ReactNode
  className?: string
  style?: CSSProperties
}

interface NavItemProps {
  data: NavData
  selected: string
  onSelect(data: NavDataLevel3): void
  showActive?: string
}

interface PopupProps {
  parentRect: DOMRect
  data: NavDataLevel2[]
  selected: string
  onSelect(data: NavDataLevel3): void
}

type NavSingleItemData = Omit<NavData, 'sub'>

interface NavSingleItemProps {
  data: NavSingleItemData
  selected: string
  onSelect(data: NavSingleItemData): void
}

export type {
  NavProps,
  NavData,
  NavDataLevel2,
  NavDataLevel3,
  NavItemProps,
  PopupProps,
  NavSingleItemProps,
}
