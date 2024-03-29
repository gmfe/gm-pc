/*
 * @Description: 受控表单自定义hook
 */

import { useEffect, useCallback, useState, useRef } from 'react'
import _, { noop } from 'lodash'

import { handleValues } from './utils'
import { RecordPartial, anyCallback, StringKey } from '../../../types'
import { getRecordPartialObject, isFalsy } from '../../utils'

export type OnFieldsChange<K = any> = (
  [changeField, changedValue]: [StringKey<K>, any],
  allValues: UseFormProps['initialValues']
) => void

export interface UseFormProps<K = any> {
  /* 表单初始值 */
  initialValues?: RecordPartial<K, any>
  /* 规格化配置 */
  normalizes?: keyof any extends K
    ? { [key: string]: anyCallback }
    : {
        [P in keyof K]?: anyCallback<K[P]>
      }
  /* 表单项改变的回调，常用于表单项联动 */
  onFieldsChange?: OnFieldsChange<K>
}

export interface FormInstance<Values = any> {
  /* 重置表单为初始值 */
  resetFields(): void
  /* 设置表单值 */
  setFieldsValue(newValues: RecordPartial<Values, any>): void
  /* 获取表单值， isOrigin：是否获取表单原始值 */
  getFieldsValue(nameList?: StringKey<Values>[], isOrigin?: boolean): Partial<Values>
  /* 表单是否验证 */
  apiDoValidate(): boolean
  validateFields(): Promise<RecordPartial<Values, any>>
}
export default function useForm<K = any>(props: UseFormProps<K>) {
  const {
    // 初始默认值
    initialValues = {},
    normalizes = getRecordPartialObject<K, anyCallback>(),
    // 表单项改变的回调
    onFieldsChange = _.noop,
  } = props
  const canSubmitRef = useRef<Partial<Record<StringKey<K>, string>>>({})
  // 由于setState后没法拿到最新值，故将最新值保存到ref中
  const latestValuesRef = useRef<RecordPartial<K, any>>({
    ...initialValues,
  })
  // 存储表单值
  const [values, setValues] = useState<RecordPartial<K, any>>({
    ...initialValues,
  })

  useEffect(() => {
    latestValuesRef.current = { ...values }
  }, [values])
  const getNormalizeValue = useCallback(
    (key: StringKey<K>, value: any) => {
      if (normalizes[key] && !isFalsy(value)) {
        return normalizes[key]?.(value)
      }
      return value
    },
    [normalizes]
  )
  /**
   * @description: 根据组件类型，name以及组件onChange的原始值获取格式化的值
   * @param {string} type 组件类型
   * @param {string} fieldName 表单名称
   * @param {object} originValue onChange的原始值
   */
  const onChange = useCallback(
    (fieldName: StringKey<K>, originValue: any) => {
      const target = originValue?.target
      const newValue = target
        ? ['checkbox', 'radio'].includes(target?.type)
          ? target.checked
          : target.value
        : originValue
      setValues((values) => {
        latestValuesRef.current = handleValues(
          values,
          fieldName,
          newValue,
          onFieldsChange
        )
        return latestValuesRef.current
      })

      return getNormalizeValue(fieldName, newValue)
    },
    [onFieldsChange, getNormalizeValue]
  )
  /**
   * @description: 重置表单
   */
  const resetFields = useCallback(() => {
    setValues({ ...initialValues })
  }, [initialValues])
  /**
   * @description: 修改表单值
   * @param {object: {fieldName: newValue}} newValues
   */
  const setFieldsValue: FormInstance<K>['setFieldsValue'] = useCallback(
    (newValues = {}) => {
      setValues((values) => ({ ...values, ...newValues }))
    },
    []
  )
  /**
   * @description: 获取表单值
   * @param {(keyof K | string][]} nameList
   * @return {object} values 表单值
   */
  const getFieldsValue: FormInstance<K>['getFieldsValue'] = useCallback(
    (nameList, isOrigin) => {
      let tempValues = { ...latestValuesRef.current }
      // 如果有传入nameList，返回nameList的值
      if (Array.isArray(nameList)) {
        tempValues = _.pick({ ...latestValuesRef.current }, nameList)
      }
      if (isOrigin) {
        return tempValues as Partial<K>
      }
      // 如果配置了规格化
      if (Object.keys(normalizes).length) {
        Object.keys(normalizes).forEach((key) => {
          const tempKey = (key as unknown) as StringKey<K>
          const value = tempValues[tempKey]
          // 如果有规格化，返回规格化的数据
          tempValues[tempKey] = getNormalizeValue(tempKey, value)
        })
      }
      return tempValues as Partial<K>
    },
    [normalizes, getNormalizeValue]
  )

  const setCanSubmit = (key: StringKey<K>, message: string) => {
    canSubmitRef.current[key] = message
  }
  const canSubmit = useCallback(() => {
    return Object.values(canSubmitRef.current).every((value) => !value)
  }, [])
  const validateFields = useCallback((): Promise<RecordPartial<K, any>> => {
    return new Promise((resolve, reject) => {
      if (canSubmit()) {
        resolve(latestValuesRef.current)
      } else {
        reject(_.omitBy(canSubmitRef.current, _.isUndefined))
      }
    })
  }, [canSubmit])
  return {
    values,
    onChange,
    resetFields,
    setFieldsValue,
    getFieldsValue,
    getNormalizeValue,
    canSubmit,
    setCanSubmit,
    validateFields,
  }
}
/**
 * @description: 获取表单实例
 * @return {Readonly<FormInstance<T>>} 表单实例
 */
export function useControlFormRef<T>() {
  const ref = useRef<Readonly<FormInstance<T>>>(({
    resetFields: noop,
    getFieldsValue: noop,
    setFieldsValue: noop,
    apiDoValidate: noop,
    validateFields: () => Promise.resolve(),
  } as unknown) as FormInstance<T>)
  return ref
}
