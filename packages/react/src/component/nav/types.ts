import { CSSProperties, ReactNode, MouseEvent } from 'react'

interface NavExtraProps {
  /** 直接到达新建页面 */
  onPushCreate(data: NavDataLevel3): void
  // 底部图片显示
  footerImage?: ReactNode
}

interface NavDataLevel3 {
  link: string
  name: string
  // 配置跳转到对应新建页的 提示 和 地址
  toCreate?: {
    tip: string
    href: string
  }
}

interface NavDataLevel2 {
  link: string
  name: string
  sub: NavDataLevel3[]
  style?: CSSProperties
}

interface NavData {
  icon?: ReactNode
  iconActive?: ReactNode
  link: string
  name: string
  sub: NavDataLevel2[]
}

interface NavProps extends NavExtraProps {
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
  // 底部 iot 图片 & 数据
  footerConfig?: NavData[]
}

interface NavItemProps extends NavExtraProps {
  data: NavData
  selected: string
  onSelect(data: NavDataLevel3): void
  /** onMouseMove 的回调 */
  onMouseMove(event: MouseEvent, link: string): void
  /** 控制子导航列表的显示 */
  showSub?: boolean
}

interface PopupProps {
  parentRect: DOMRect
  data: NavDataLevel2[]
  selected: string
  onSelect(data: NavDataLevel3): void
  onPushCreate(data: NavDataLevel3): void
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
