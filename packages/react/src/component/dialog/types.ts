import { HTMLAttributes, ReactNode } from 'react'
import { Size as DialogSize } from '../../common/enum'
import { ButtonType } from '../button'

interface DialogPromptProps extends HTMLAttributes<HTMLInputElement> {}

interface DialogButtonProps {
  text: string
  onClick(event?: Event): void
  btnType?: ButtonType
}

interface DialogProps {
  title?: string
  size?: DialogSize
  buttons: DialogButtonProps[]
  children: ReactNode
}

interface DialogStatic {
  render(props: DialogProps): void
  hide(): void
}

interface AlertOptions {
  okBtnText?: string
  children: ReactNode
}

type AlertProps = string | AlertOptions

interface ConfirmOptions {
  okBtnText?: string
  cancelBtnText?: string
  children: ReactNode
}

type ConfirmProps = string | ConfirmOptions

export type {
  DialogProps,
  DialogButtonProps,
  DialogPromptProps,
  DialogStatic,
  AlertProps,
  AlertOptions,
  ConfirmProps,
  ConfirmOptions,
}
export { DialogSize }
