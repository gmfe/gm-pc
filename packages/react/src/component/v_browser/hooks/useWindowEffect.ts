import { reaction } from 'mobx'
import React, { useEffect, useContext, useRef } from 'react'
import BrowserContext from '../context/browser'
import BrowserWindowContext from '../context/browserWindow'

type Noop = () => void
/**
 * 多窗口中的子页面组件因为被缓存，原来的useEffect受到影响： effect仅在子窗口创建时触发，销毁函数仅在窗口关闭时触发；子窗口失活时依然会观察deps，并触发effect；
 *
 * 根据情况可以考虑使用useWindowEffect来替换useEffect，功能： 窗口激活时、deps更新时，触发fn执行； 窗口失活时执行fn返回的销毁函数； 如果子窗口为失活状态，不观察deps的更新；
 *
 */
export default function useWindowEffect(fn: () => Noop | void, deps: Array<any> = []) {
  const browser = useContext(BrowserContext)
  /** hook所在窗口 */
  const browserWindow = useContext(BrowserWindowContext)
  const cb = useRef<Noop | void>()

  useEffect(() => {
    if (!browser || !browserWindow) {
      console.warn('useWindowEffect需要在VBrowser中使用, 否则将回退到useEffect')
      cb.current = fn()
      return cb.current
    }

    const alive = browserWindow.path === browser.activeWindow?.path
    if (!alive) return

    // 激活\失活
    const dispose = reaction(
      () => browser.activeWindow,
      (cur, pre) => {
        if (pre?.path !== browserWindow.path && cur?.path !== browserWindow.path) {
          return
        }
        const activate = cur?.path === browserWindow.path
        const deactivate = pre?.path === browserWindow.path
        if (activate) {
          cb.current = fn()
        }
        if (deactivate) {
          cb.current && cb.current()
        }
      }
      // { fireImmediately: true }
    )
    cb.current = fn()
    return () => {
      dispose()
      cb.current && cb.current()
    }
  }, deps)
}
