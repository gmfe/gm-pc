import { ReactNode } from 'react'
import { HocMiddleware } from './types'

// 洋葱模型
const compose = (...fns: HocMiddleware[]): HocMiddleware => {
  fns = [...fns]
  if (fns.length === 0) {
    return (node: ReactNode) => node
  }
  return fns.reduce((res, cur) => (...args: any) => res(cur(...args)))
}
// 中间件
const applyMiddleware = (...middlewares: HocMiddleware[]) => (node: ReactNode) => {
  return compose(...middlewares)(node)
}

export { applyMiddleware }
