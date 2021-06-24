import {
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement as ReactCloneElement,
} from 'react'
import { Rule } from '.'
import { getLocale } from '@gm-pc/locales'
import { pattern } from '../../../validator/rules'
type AnyObject = Record<any, any>

export type RenderProps =
  | undefined
  | AnyObject
  | ((originProps: AnyObject) => AnyObject | undefined)

export function replaceElement(
  element: ReactNode,
  replacement: ReactNode,
  props: RenderProps
): ReactNode {
  if (!isValidElement(element)) return replacement

  return ReactCloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props
  )
}
export function cloneElement(element: ReactNode, props?: RenderProps): ReactElement {
  return replaceElement(element, element, props) as ReactElement
}

function isValueEmpty(value: string | [] | undefined | null) {
  if (value === undefined || value === null) return true
  if ((typeof value === 'string' || Array.isArray(value)) && !value.length) {
    return true
  }
  return false
}

function isWhiteSpace(str: any) {
  return /\s/.test(str)
}
export function getWarningMessage<T>(
  rules: Rule<T>[] = [],
  values: T,
  name: string,
  required = false
) {
  let warningMessage: string | ReactNode
  // @ts-ignore
  const value = values?.[name]
  const isEmpty = isValueEmpty(value)
  if (required && isEmpty) {
    warningMessage = getLocale('请填写')
    if (rules.length === 0) {
      return warningMessage
    }
    rules.some((rule) => {
      if (typeof rule === 'object' && rule.required) {
        warningMessage = rule.message
        return true
      }
      return false
    })

    return warningMessage
  }

  for (const rule of rules) {
    if (typeof rule === 'object') {
      if (rule.required && isEmpty) {
        warningMessage = rule.message
      }
      /**
       *  value有和可能字符串和数字
       *  1. string :
       *    { min: 1},这时候value = '',则验证不通过
       *    { max: 2},这时候value = 'xxx',则验证不通过
       * 2. number :
       *    { min: 1},这时候value = 0.99,则验证不通过
       *    { max: 2},这时候value = 2.001,则验证不通过
       *
       * 如果配置了len=5,字符串'xxx'长度为3，数字666666长度为6，都不等于len=5
       */
      if (!isEmpty) {
        if (typeof value === 'number' || typeof value === 'string') {
          const tempValue = typeof value === 'number' ? value : value.length
          if (
            (rule.len && value.toString().length !== rule.len) ||
            ((rule.max || rule.max === 0) && tempValue > rule.max) ||
            ((rule.min || rule.min === 0) && tempValue < rule.min)
          ) {
            warningMessage = rule.message
          }
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          warningMessage = rule.message
        }
        if (rule.whitespace && isWhiteSpace(value)) {
          warningMessage = rule.message
        }
        if (rule.type) {
          switch (rule.type) {
            case 'integer':
              if (!Number.isInteger(Number(value))) {
                warningMessage = rule.message
              }
              break
            case 'url':
            case 'email':
              if (!pattern[rule.type].test(value)) {
                warningMessage = rule.message
              }
              break
            default:
              break
          }
        }
      }
    } else {
      if (!isEmpty) {
        warningMessage = rule(values)
      }
    }
    if (warningMessage) {
      return warningMessage
    }
  }

  return warningMessage
}
