/*
 * @Description: 受控表单自定义hook
 */

import { useCallback, useState, useRef } from 'react'
import _, { noop } from 'lodash'

import { handleValues } from './utils'
import { RecordPartical, StringOrKeyofT, anyCallback } from '../../../types'
import { getRecordParticalObject, isFalsy } from '../../utils'

export type OnFieldsChange<K = any> = (
  [changeField, changedValue]: [StringOrKeyofT<K>, any],
  allValues: UseFormProps['initialValues']
) => void

export interface UseFormProps<K = any> {
  initialValues?: RecordPartical<K, any>
  normalizes?: RecordPartical<K, anyCallback>
  onFieldsChange?: OnFieldsChange<K>
}

export interface FormInstance<Values = any> {
  resetFields(): void
  setFieldsValue(newValues: RecordPartical<Values, any>): void
  getFieldsValue(nameList?: StringOrKeyofT<Values>[]): Partial<Values>
  apiDoValidate(): boolean
}
export default function useForm<K = any>(props: UseFormProps<K>) {
  const {
    // 初始默认值
    initialValues = {},
    normalizes = getRecordParticalObject<K, anyCallback>(),
    // 表单项改变的回调
    onFieldsChange = _.noop,
  } = props

  // 存储表单值
  const [values, setValues] = useState<RecordPartical<K, any>>({
    ...initialValues,
  })
  const getNormalizeValue = useCallback(
    (key: StringOrKeyofT<K>, value: any) => {
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
    (fieldName: StringOrKeyofT<K>, originValue: any) => {
      const target = originValue?.target
      const newValue = target
        ? _.hasIn(target, 'checked')
          ? target.checked
          : target.value
        : originValue
      setValues((values) => handleValues(values, fieldName, newValue, onFieldsChange))
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
    (nameList) => {
      let tempValues = { ...values }
      // 如果有传入nameList，返回nameList的值
      if (Array.isArray(nameList)) {
        tempValues = _.pick({ ...values }, nameList)
      }
      // 如果配置了规格化
      if (Object.keys(normalizes).length) {
        Object.keys(normalizes).forEach((key) => {
          const tempKey = (key as unknown) as StringOrKeyofT<K>
          const value = tempValues[tempKey]
          // 如果有规格化，返回规格化的数据
          tempValues[tempKey] = getNormalizeValue(tempKey, value)
        })
      }
      return tempValues as Partial<K>
    },
    [values, normalizes, getNormalizeValue]
  )

  return {
    values,
    onChange,
    resetFields,
    setFieldsValue,
    getFieldsValue,
    getNormalizeValue,
  }
}

export function useControlFormRef<T>() {
  const ref = useRef<FormInstance<T>>(({
    resetFields: noop,
    getFieldsValue: noop,
    setFieldsValue: noop,
    apiDoValidate: noop,
  } as unknown) as FormInstance<T>)
  return ref
}
