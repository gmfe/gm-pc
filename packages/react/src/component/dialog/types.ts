import { HTMLAttributes, ReactNode } from 'react'
import { ButtonType } from '../button'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl'

type DialogPromptProps = HTMLAttributes<HTMLInputElement>

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
  DialogSize,
  DialogStatic,
  AlertProps,
  AlertOptions,
  ConfirmProps,
  ConfirmOptions,
}
