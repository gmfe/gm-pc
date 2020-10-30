export { default as Dialog } from './dialog'
export { default as Alert } from './alert'
export { default as Confirm } from './confirm'
export { default as Prompt } from './prompt'
// 文件名从 delete => delete_com，避免编译错误
export { default as Delete } from './delete_com'

export type {
  DialogProps,
  DialogSize,
  DialogButtonProps,
  DialogPromptProps,
  ConfirmProps,
  PromptProps,
  DeleteProps,
} from './types'
