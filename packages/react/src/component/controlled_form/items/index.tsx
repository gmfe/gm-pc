/*
 * @Description: 渲染单个表单项
 */
import React, { ReactElement, useContext } from 'react'
import { FormInstance } from '../../../common/hooks'
import { FormItem, FormItemProps } from '../../form'
import { ControlledFormContext } from '../context'
import { cloneElement } from './utils'
import { StringOrKeyofT } from '../../../types'
export interface ControlFormItemProps<T = any> extends FormItemProps {
  /* 表单名 */
  name?: StringOrKeyofT<T>
  /* 组件value名 */
  valuePropName?: 'value' | 'checked' | 'selected' | 'date'
  /* 是否隐藏表单 */
  hide?: boolean
  /* 组件触发函数名 */
  trigger?: string
  children: ReactElement
  /* 表单项改变的回调 */
  onFieldChange?(newValue: any, context: Omit<FormInstance, 'apiDoValidate'>): void
}
function Item(props: ControlFormItemProps) {
  const {
    name = '',
    valuePropName = 'value',
    // 控制表单是否隐藏
    hide,
    trigger = 'onChange',
    children,
    onFieldChange,
    ...restProps
  } = props

  const {
    values,
    hideItems,
    onChange,
    resetFields,
    setFieldsValue,
    getFieldsValue,
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
  return <FormItem {...restProps}>{cloneElement(children, childProps)}</FormItem>
}

export default Item
