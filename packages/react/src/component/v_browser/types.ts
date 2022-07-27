import { ReactNode } from 'react'

export interface VBrowserWindow {
  path: string
  query?: { [key: string]: string }
  /** 窗口图标 */
  faviconURL?: string
  /** 窗口名，如果不存在将尝试从vBrowser的autoTitle中取 */
  title?: ReactNode | Element
  /** 可否关闭，默认为true */
  closeable?: boolean
}

export interface VBrowserProps {
  /** 窗口数量限制 */
  maxLength?: number
  /** 准备就绪 (读取Storage) */
  onReady?: Function
  /** 重新打开vBrowser时恢复已打开窗口, 默认为true */
  restore?: boolean
  /** 窗口变化事件 */
  onChange?: (
    from: VBrowserWindow | undefined,
    to: VBrowserWindow,
    windows: VBrowserWindow[]
  ) => void
  /** 窗口打开/切换前调用，返回false会阻止窗口打开/切换 */
  auth?: (from?: VBrowserWindow, to?: VBrowserWindow) => Promise<boolean> | boolean
  /**
   * 错误码参考
   *
   * code: 0, message: '超过最大允许的窗口数量'
   *
   * code: 1, message: '鉴权失败'
   *
   * code: 2, message: '路由不存在‘
   *
   */
  onError?: (error: { code: number; message: string }) => void
  /** 打开窗口如果没有传入标题，则使用此方法取标题 */
  autoTitle?: (path: string) => string
  /** 不以子窗口形式展示的页面名单（视觉上）, 这些页面会子窗口形式打开，但是视觉上会隐藏子窗口标签栏，且在离开页面时自动close掉，以达到子页面不在vbrowser中的视觉效果 */
  ignoredPath?: Array<string | RegExp>
}

export interface CacheItem {
  vNode: JSX.Element & {
    ref: {
      current: HTMLDivElement | undefined
    }
  }
}
