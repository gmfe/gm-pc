import { HTMLAttributes, ReactNode } from 'react'
import { ButtonType } from '../button'
import { ConfigProviderProps } from '../config_provider'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl'

type DialogPromptProps = HTMLAttributes<HTMLInputElement>

interface DialogButtonProps {
  text: string
  onClick(event?: Event): void
  btnType?: ButtonType
  disabled?: boolean
  loading?: boolean
}

interface DialogProps extends ConfigProviderProps {
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
  okBtnType?: ButtonType
  cancelBtnText?: string
  /** prompt 用 */
  onValidate?: (value: string) => boolean | void
  /** 阅读提示 */
  read?: boolean | string
  confirmLoading?: boolean
  onOk?: () => any
  onCancel?: (error: any) => any
}

interface PromptProps extends ConfirmProps, ConfigProviderProps {
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
