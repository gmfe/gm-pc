/*
 * @Description: 渲染单个表单项
 */
import React, { ReactElement, useContext } from 'react'
import { FormItem, FormItemProps } from '../../form'
import { ControlledFormContext } from '../context'
import { cloneElement } from './utils'

export interface ItemProps extends FormItemProps {
  name?: string
  valuePropName?: 'value' | 'checked' | 'selected'
  hide?: boolean
  trigger?: string
  children: ReactElement
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
    ...restProps
  } = props

  const { values, hideItems, onChange } = useContext(ControlledFormContext)
  const isHide = hide || hideItems?.[name]

  if (isHide) {
    return null
  }
  const childProps = {
    ...children.props,
  }
  if (name) {
    childProps[valuePropName] = values?.[name]
    const triggers = new Set<string>([trigger])
    if (!Array.isArray(children)) {
      triggers.forEach((eventName) => {
        childProps[eventName] = (args: unknown) => {
          onChange && onChange(name, args)
        }
      })
    }
  }
  return <FormItem {...restProps}>{cloneElement(children, childProps)}</FormItem>
}

export default Item
