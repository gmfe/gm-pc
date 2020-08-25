import { CSSProperties, ReactNode } from 'react'
import { Size as ModalSize } from '../../common/enum'

interface CommonModalProps {
  title?: string
  size?: ModalSize
  onHide?(): void
  disableMaskClose?: boolean
  style?: CSSProperties
  okBtnClassName?: string
  noContentPadding?: boolean
  children: ReactNode
}

interface ModalProps extends CommonModalProps {
  opacityMask?: boolean
  noCloseBtn?: boolean
  onCancel?(): void
  onOk?(): void
  className?: string
}

interface ModalStatic {
  render(props: ModalProps): void
  hide(): void
}

export type { ModalProps, ModalStatic }
export { ModalSize }
