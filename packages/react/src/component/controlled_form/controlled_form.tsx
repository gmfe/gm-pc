/*
 * @Description: 受控表单
 */
import React, {
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  ReactNode,
  Ref,
} from 'react'
import { Form, FormProps } from '../form'
import { noop } from 'lodash'
import { useForm, UseFormProps, FormInstance } from '../../common/hooks'
import { getRecordPartialObject, isFalsy } from '../../common/utils'
import { ControlledFormContext, ControlledFormContextProps } from './context'
import { RecordPartial, StringOrKeyofT, anyCallback } from '../../types'

export interface ControlledFormProps<K = any>
  extends UseFormProps<K>,
    Omit<FormProps, 'onSubmit'> {
  /* 表单实例，可拿到一些方法 */
  form?: Ref<FormInstance<K>>
  /* 要隐藏的表单项 */
  hideItems?: RecordPartial<K, boolean>
  /* 提交获取值是否过滤 null | undefined | '' */
  isIgnoreFalsy?: boolean
  // 初始化是否触发onSubmit
  isSubmitInit?: boolean
  children?: ReactNode
  /* 表单提交的回调 */
  onSubmit?(values: Partial<K>): void
}

function ControlledForm<K = any>(props: ControlledFormProps<K>) {
  const {
    form,
    // 默认值
    initialValues = getRecordPartialObject<K, any>(),
    // 规格化配置
    normalizes = getRecordPartialObject<K, anyCallback>(),
    // 表单提交时是否去除值为undefined, null, ''的项
    isIgnoreFalsy = true,
    isSubmitInit,
    // 隐藏的表单项 要隐藏将fieldName设为tue ，如{ alloc_type: true }
    hideItems = getRecordPartialObject<K, boolean>(),
    children,
    // 表单项改变的时候,回调第一个是改变的字段及新的值，第二个参数是所有新的值
    onFieldsChange = noop,
    // 表单提交的回调
    onSubmit: onTempSubmit,
    onSubmitValidated,
    ...res
  } = props

  const {
    values = getRecordPartialObject<K, any>(),
    onChange,
    resetFields,
    setFieldsValue,
    getFieldsValue,
    getNormalizeValue,
  } = useForm<K>({
    initialValues,
    normalizes,
    onFieldsChange,
  })

  const didMountRef = useRef(false)

  const formRef = useRef<Form>(null)

  //  表单提交
  const onSubmit = useCallback((): void => {
    const tempValues: ControlledFormProps<K>['initialValues'] = { ...values }
    if (isIgnoreFalsy || Object.keys(normalizes).length) {
      Object.keys(values).forEach((key) => {
        const tempKey = key as StringOrKeyofT<K>

        const value = values[tempKey]
        // 剔除掉undefined, null和空字符串
        if (isIgnoreFalsy && isFalsy(value)) {
          delete tempValues[tempKey]
        } else {
          tempValues[tempKey] = getNormalizeValue(tempKey, value)
        }
      })
    }
    onTempSubmit && onTempSubmit(tempValues as K)
  }, [getNormalizeValue, isIgnoreFalsy, normalizes, onTempSubmit, values])
  useEffect(() => {
    if (isSubmitInit && !didMountRef.current) {
      didMountRef.current = true
      onSubmit()
    }
  }, [isSubmitInit, onSubmit])
  useImperativeHandle(form, () => ({
    resetFields,
    setFieldsValue,
    getFieldsValue,
    apiDoValidate: formRef.current!.apiDoValidate,
  }))

  const formProps = {
    ...res,
    ref: formRef,
  }
  if (onTempSubmit) {
    Object.assign(formProps, { onSubmit })
  }
  if (onSubmitValidated) {
    Object.assign(formProps, { onSubmitValidated: onSubmit })
  }
  const providerValues = {
    values,
    hideItems,
    onChange,
    resetFields,
    setFieldsValue,
    getFieldsValue,
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
