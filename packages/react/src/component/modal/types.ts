import { CSSProperties, ReactNode } from 'react'
import { Type } from '../layout_root'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

interface ModalProps {
  title?: string
  size?: ModalSize
  onHide?(): void
  disableMaskClose?: boolean
  noContentPadding?: boolean
  opacityMask?: boolean
  noCloseBtn?: boolean
  className?: string
  containerClassName?: string
  style?: CSSProperties
  children: ReactNode
}

interface ModalStatic {
  _render(props: ModalProps, type?: Type): void
  _hide(type?: Type): void
  render(props: ModalProps): void
  hide(): void
}

export type { ModalProps, ModalSize, ModalStatic }
