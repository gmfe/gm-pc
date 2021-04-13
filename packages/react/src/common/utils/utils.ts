import { anyCallback } from '../../types'

export function isFalsy(value: any): boolean {
  return [undefined, null, ''].includes(value)
}
/**
 * @description: 判断是否是函数，是的话执行该函数并传入响应的参数
 * @param {function} fn 待执行的函数
 * @param {} args fn的参数
 */

export function judgeFunction(fn?: anyCallback, ...args: any[]): void {
  if (typeof fn === 'function') {
    fn(...args)
  }
}
