import { reaction } from 'mobx'
import React, { useEffect, useContext } from 'react'
import BrowserContext from '../context/browser'
import BrowserWindowContext from '../context/browserWindow'

type Noop = () => void
/**
 * 子窗口中使用useWindowEffect来替换useEffect.
 *
 * 功能：
 *
 * 观察deps的更新并执行fn，fn可选的返回一个方法，其会在窗口失活时被执行；
 *
 * 如果当前子窗口为失活状态，不观察deps的更新；
 *
 * 要监听窗口关闭事件，可以继续使用useEffect；
 *
 */
export default function useWindowEffect(fn: () => Noop | void, deps: Array<any> = []) {
  const browser = useContext(BrowserContext)
  const browserWindow = useContext(BrowserWindowContext)

  let cb: Noop | void

  useEffect(() => {
    if (!browser || !browserWindow) {
      console.warn('useWindowEffect需要在VBrowser中使用, 否则将回退到useEffect')
      cb = fn()
      return cb
    }

    const alive = browserWindow.path === browser.activeWindow.path
    if (!alive) return

    const dispose = reaction(
      () => browser.activeWindow,
      (cur, pre) => {
        const activate = cur.path === browserWindow.path
        const deactivate = pre.path === browserWindow.path
        if (activate) cb = fn()
        if (deactivate) cb && cb()
      }
    )
    cb = fn()
    return dispose
  }, deps)
}
