import { ReactNode } from 'react'
import type { History } from 'history'

export interface VBrowserWindow {
  path: string
  query?: { [key: string]: string }
  /** 窗口图标 */
  faviconURL?: string
  title?: ReactNode | Element
  /** 可否关闭，默认为true */
  closeable?: boolean
}

export interface VBrowserProps {
  history: History
  /** 窗口数量限制 */
  maxLength?: number
  /** VBrowser挂载完成 */
  onMounted?: Function
  /** 重新打开vBrowser时恢复已打开窗口, 默认为true */
  restore?: boolean
  /** 窗口变化事件 */
  onChange?: (from: VBrowserWindow, to: VBrowserWindow, windows: VBrowserWindow[]) => void
  /** 窗口打开/切换前调用，返回false会阻止窗口打开/切换 */
  auth?: (from?: VBrowserWindow, to?: VBrowserWindow) => Promise<boolean> | boolean
  onError?: (error: Error) => void
}

export interface CacheItem {
  vNode: JSX.Element & {
    ref: {
      current: HTMLDivElement | undefined
    }
  }
}
