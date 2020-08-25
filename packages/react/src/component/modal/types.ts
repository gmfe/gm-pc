import { CSSProperties, ReactNode } from 'react'
import { Size as ModalSize } from '../../common/enum'

interface ModalProps {
  title?: string
  size?: ModalSize
  onHide?(): void
  disableMaskClose?: boolean
  noContentPadding?: boolean
  opacityMask?: boolean
  noCloseBtn?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
}

interface ModalStatic {
  render(props: ModalProps): void
  hide(): void
}

export type { ModalProps, ModalStatic }
export { ModalSize }
