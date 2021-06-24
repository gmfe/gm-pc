/*
 * @Description: 渲染单个表单项
 */
import React, { ReactElement, useContext } from 'react'
import { FormInstance } from '../../../common/hooks'
import { FormItem, FormItemProps } from '../../form'
import { ControlledFormContext } from '../context'
import { cloneElement, getWarningMessage } from './utils'
import { StringKey } from '../../../types'
/** ---------Rule -------- end */
export declare type RuleType = 'integer' | 'url' | 'email'
type StoreValue = any
declare type Validator = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void
) => Promise<void | any> | void
export declare type RuleRender<T = any> = (values: T) => string | undefined
export interface ValidatorRule {
  message?: string | ReactElement
  validator: Validator
}
interface BaseRule {
  len?: number
  max?: number
  min?: number
  pattern?: RegExp
  required?: boolean
  whitespace?: boolean
  type?: RuleType
}
declare type AggregationRule = BaseRule & Partial<ValidatorRule>
export declare type RuleObject = AggregationRule
export declare type Rule<T = any> = RuleObject | RuleRender<T>
/** ---------Rule -------- end */
export interface ControlFormItemProps<T = any> extends FormItemProps {
  /* 表单名 */
  name?: StringKey<T>
  /* 组件value名 */
  valuePropName?: 'value' | 'checked' | 'selected' | 'date'
  /* 是否隐藏表单 */
  hide?: boolean
  /* 组件触发函数名 */
  trigger?: string
  rules?: Rule<T>[]
  children: ReactElement
  /* 表单项改变的回调 */
  onFieldChange?(
    newValue: any,
    context: Omit<FormInstance, 'apiDoValidate' | 'validateFields'>
  ): void
}
function ControlledFormItem<T = any>(props: ControlFormItemProps<T>) {
  const {
    name = '',
    valuePropName = 'value',
    // 控制表单是否隐藏
    hide,
    trigger = 'onChange',
    children,
    onFieldChange,
    rules,
    ...restProps
  } = props

  const {
    values,
    hideItems,
    onChange,
    resetFields,
    setFieldsValue,
    getFieldsValue,
    setCanSubmit,
    didClickSubmit,
  } = useContext(ControlledFormContext)
  const isHide = hide || hideItems?.[name]

  if (isHide) {
    return null
  }
  const childProps = {
    ...children.props,
  }
  // 如果有提供name
  if (name) {
    // 拦截加上value
    childProps[valuePropName] = values?.[name]
    const triggers = new Set<string>([trigger])
    if (!Array.isArray(children)) {
      triggers.forEach((eventName) => {
        childProps[eventName] = (args: any) => {
          // 触发更新
          if (onChange) {
            const newValue = onChange(name, args)
            if (onFieldChange && resetFields && getFieldsValue && setFieldsValue) {
              onFieldChange(newValue, { resetFields, getFieldsValue, setFieldsValue })
            }
          }
        }
      })
    }
  }
  const warningMessage = getWarningMessage(rules, values as T, name, restProps.required)
  if (name) {
    setCanSubmit(name, warningMessage)
  }

  return (
    <FormItem {...restProps} warningMessage={didClickSubmit ? warningMessage : undefined}>
      {cloneElement(children, childProps)}
    </FormItem>
  )
}

export default ControlledFormItem
