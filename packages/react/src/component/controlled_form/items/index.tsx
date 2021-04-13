/*
 * @Description: 渲染单个表单项
 */
import React, { ReactElement, useContext } from 'react'
import { FormInstance } from '../../../common/hooks'
import { FormItem, FormItemProps } from '../../form'
import { ControlledFormContext } from '../context'
import { cloneElement } from './utils'

export interface ItemProps extends FormItemProps {
  name?: string
  valuePropName?: 'value' | 'checked' | 'selected'
  hide?: boolean
  trigger?: string
  children: ReactElement
  onFieldChange?(newValue: any, context: Omit<FormInstance, 'apiDoValidate'>): void
}
function Item(props: ItemProps) {
  const {
    name = '',
    valuePropName = 'value',
    // 提示
    // tip = null,
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
