import { HTMLAttributes, ReactNode } from 'react'
import { ButtonType } from '../button'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl'

type DialogPromptProps = HTMLAttributes<HTMLInputElement>

interface DialogButtonProps {
  text: string
  onClick(event?: Event): void
  btnType?: ButtonType
  disabled?: boolean
}

interface DialogProps {
  title?: string
  size?: DialogSize
  buttons?: DialogButtonProps[]
  /** 如果不提供，自动调用关闭 */
  onHide?(): void
  children: ReactNode
}

type SpecificDialogProps = Omit<DialogProps, 'buttons' | 'onHide'>

interface DialogStatic {
  render(props: DialogProps): void
  hide(): void
}

interface AlertProps extends SpecificDialogProps {
  okBtnText?: string
}

interface ConfirmProps extends SpecificDialogProps {
  okBtnText?: string
  cancelBtnText?: string
  onValidate?: (value: string) => boolean | void
}

interface PromptProps extends ConfirmProps {
  defaultValue?: string
  placeholder?: string
}

interface DeleteProps extends ConfirmProps {
  /** 阅读提示 */
  read?: boolean | string
}

export type {
  DialogProps,
  DialogButtonProps,
  DialogPromptProps,
  DialogSize,
  DialogStatic,
  AlertProps,
  ConfirmProps,
  PromptProps,
  DeleteProps,
}
