import {
  CSSProperties,
  FormEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  RefObject,
} from 'react'
import Form from './form'

type FormBtnPosition = 'left' | 'center' | 'right'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** 默认处理了 event.preventDefault，避免犯低级错误 */
  onSubmit?(event: FormEvent<HTMLFormElement>): void
  /** 在通过所有 FormItem 定义的 validate 之后调用 */
  onSubmitValidated?(): void
  /** 行内模式，一般用不到。目前仅在 BoxForm 内部自动使用 */
  inline?: boolean
  /** 去除 FormItem 默认一栏宽度的限制 */
  disabledCol?: boolean
  /** 自定义列宽 */
  colWidth?: string
  /** 标题宽度 */
  labelWidth?: string
  /** 只在 FormGroup 下用，用于添加一个隐藏的按钮，来响应 Enter */
  hasButtonInGroup?: boolean
  btnPosition?: FormBtnPosition
}

interface FormBlockProps {
  /* 占用栏数 */
  col?: 1 | 2 | 3
  /* 默认由 Form 透传下来 */
  disabledCol?: boolean
  /* 默认由 Form 透传下来 */
  inline?: boolean
  className?: string
  style?: CSSProperties
}

interface FormButtonProps {
  /* 默认由 Form 透传下来 */
  labelWidth?: string
  /* 默认由 Form 透传下来 */
  btnPosition?: FormBtnPosition
}

interface FormItemProps {
  /* 占用栏数 */
  col?: 1 | 2 | 3
  /* 默认从 Form 透传下来 */
  disabledCol?: boolean
  /* 标题，自带`:` */
  label?: string | ReactNode
  tooltip?: ReactNode
  /* 必传，会自动带上校验器 */
  required?: boolean
  /* 去除 label 为了和表单元素对齐的上边距 */
  unLabelTop?: boolean
  /* 自定义表单验证器，优先级高于 error 和 help，低于 required */
  validate?(validator?: (value: any) => string): string
  /**
   * 少用，用于内部展示
   * @deprecated
   */
  error?: boolean
  /**
   * 少用，用于内部展示
   * @deprecated
   */
  help?: string
  /* 默认由 Form 透传下来 */
  labelWidth?: string
  /* 默认由 Form 透传下来 */
  colWidth?: string
  className?: string
  style?: CSSProperties
  /** 警告信息 */
  warningMessage?: ReactNode | string
}

interface FormPanelProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  left?: ReactNode
  right?: ReactNode
  showBorder?: boolean
}

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  formRefs: RefObject<Form>[]
  onSubmit?(): void
  onSubmitValidated?(): void
  onCancel?(): void
  disabled?: boolean
  /* 确定按钮的文案，默认为保存 */
  saveText?: string
  actions?: ReactNode
  absolute?: boolean
}

export type {
  FormProps,
  FormBlockProps,
  FormBtnPosition,
  FormButtonProps,
  FormItemProps,
  FormPanelProps,
  FormGroupProps,
}
