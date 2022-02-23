import { VBrowserPage } from './v_browser'

export default class VBrowserWindow {
  /** 当前窗口的页面堆栈 */
  pages: VBrowserPage[] = []

  /** 当前窗口页面堆栈的指针 */
  index = 0

  /** 当前页面 */
  get page() {
    return this.pages[this.index]
  }

  /** 是否可以关闭 */
  closeable = false
}
