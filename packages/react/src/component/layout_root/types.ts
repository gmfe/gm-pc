import { ReactNode } from 'react'

enum Type {
  POPOVER = 'popover',
  DRAWER = 'drawer',
  RIGHT_SIDE_MODAL = 'right_side_modal',
  MODAL = 'modal',
  TIP = 'tip',
  FULL_LOADING = 'full_loading',
  N_PROGRESS = 'n_progress',
}

type SetComponentFunc = ((type: Type, component: ReactNode) => void) | null

interface State {
  popover?: ReactNode[]
  drawer?: ReactNode
  right_side_modal?: ReactNode
  modal?: ReactNode
  tip?: ReactNode[]
  full_loading?: ReactNode
  n_progress?: ReactNode
}

interface LayoutRootStatic {
  Type: typeof Type
  setComponent(type: Type, component?: ReactNode): void
  removeComponent(type: Type): void
  setComponentArray(type: Type, id: string, Component?: ReactNode): void
  removeComponentArray(type: Type, id: string): void
  clearComponentArray(type: Type): void
}

interface ComponentListItem {
  id: string
  com: ReactNode
}

export { Type }
export type { SetComponentFunc, State, LayoutRootStatic, ComponentListItem }
