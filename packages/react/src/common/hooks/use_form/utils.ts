/**
 * @description: 处理表单值
 * @param {object} values 旧的表单值
 * @param {string} fieldName 修改的表单名
 * @param {any} newValue 修改后的表单值
 */
import { anyCallback } from '../../../types'
import { judgeFunction } from '../../utils'
function handleValues<T>(
  values: T,
  fieldName: keyof T,
  newValue: Partial<T>,
  onFieldsChange: anyCallback
): T {
  const newValues = { ...values, [fieldName]: newValue }
  // 表单值改变的时候触发回调,放入宏任务队列，避免setState的回调又是setState导致警告
  const timer = setTimeout(() => {
    judgeFunction(onFieldsChange, [fieldName, newValue], { ...newValues })
    clearTimeout(timer)
  })
  return newValues
}
export { handleValues }
