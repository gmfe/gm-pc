/*
 * @Description: 受控表单
 */
import React, { useImperativeHandle, useRef, ReactNode, Ref } from 'react'
import { Form, FormProps } from '../form'
import { noop } from 'lodash'
import { useForm, UseFormProps, FormInstance } from '../../common/hooks'
import { getRecordParticalObject } from '../../common/utils'
import { ControlledFormContext, ControlledFormContextProps } from './context'
import { RecordPartical, StringOrKeyofT } from '../../types'

export interface ControlledFormProps<K = any>
  extends UseFormProps<K>,
    Omit<FormProps, 'onSubmit'> {
  form?: Ref<FormInstance<K>>
  hideItems?: RecordPartical<K, boolean>
  isIgnoreFalsy?: boolean
  children?: ReactNode
  onSubmit?(values: Partial<K>): void
}

function isFalsy(value: any) {
  return [undefined, null, ''].includes(value)
}

function ControlledForm<K = any>(props: ControlledFormProps<K>) {
  const {
    form,
    // 默认值
    defaultValues = getRecordParticalObject<K, any>(),
    normalizes = getRecordParticalObject<K, typeof noop>(),
    // 表单提交时是否去除值为undefined, null, ''的项
    isIgnoreFalsy = true,
    // 隐藏的表单项 要隐藏将fieldName设为tue ，如{ alloc_type: true }
    hideItems = getRecordParticalObject<K, boolean>(),
    children,
    // 表单项改变的时候,回调第一个是改变的字段及新的值，第二个参数是所有新的值
    onFieldsChange = noop,
    // 表单提交的回调
    onSubmit: onTempSubmit = noop,
    ...res
  } = props

  const {
    values = getRecordParticalObject<K, any>(),
    onChange,
    resetFields,
    setFieldsValue,
    getFieldsValue,
  } = useForm<K>({
    defaultValues,
    normalizes,
    onFieldsChange,
  })

  const formRef = useRef<Form>(null)

  //  表单提交
  const onSubmit = () => {
    const tempValues: ControlledFormProps<K>['defaultValues'] = { ...values }
    if (isIgnoreFalsy || Object.keys(normalizes).length) {
      Object.keys(values).forEach((key) => {
        const tempKey = key as StringOrKeyofT<K>

        const value = values[tempKey]
        // 剔除掉undefined, null和空字符串
        if (isIgnoreFalsy && isFalsy(value)) {
          delete tempValues[tempKey]
        } else if (normalizes[tempKey]) {
          tempValues[tempKey] = normalizes[tempKey]?.(value)
        }
      })
    }
    onTempSubmit(tempValues as K)
  }
  useImperativeHandle(form, () => ({
    resetFields,
    setFieldsValue,
    getFieldsValue,
    apiDoValidate: formRef.current!.apiDoValidate,
  }))

  const formProps = {
    ...res,
    ref: formRef,
    onSubmit,
    onSubmitValidated: onSubmit,
  }
  const providerValues = {
    values,
    hideItems,
    onChange,
  } as ControlledFormContextProps
  return (
    <Form {...formProps}>
      <ControlledFormContext.Provider value={providerValues}>
        {children}
      </ControlledFormContext.Provider>
    </Form>
  )
}

export default ControlledForm
