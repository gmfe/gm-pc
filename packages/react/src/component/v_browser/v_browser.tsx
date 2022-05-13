import React from 'react'
import { makeAutoObservable, observable } from 'mobx'
import VBrowserContainer from './ui/index'
import BrowserContext from './context/browser'
import { CacheItem, VBrowserProps, VBrowserWindow } from './types'

// @ts-ignore
const req = require.context('@/pages', true, __AUTO_ROUTER_REG__, 'lazy')
export const pages = req.keys().map((key) => {
  return {
    path: key.replace(/^\./, '').replace('/index.page.tsx', ''),
    loader: () => Promise.resolve(req(key)),
  }
})

class VBrowser {
  constructor(props: VBrowserProps) {
    this.props = props
    this.props.restore = this.props.restore ?? true
    this.ui = (
      <BrowserContext.Provider value={this}>
        <VBrowserContainer />
      </BrowserContext.Provider>
    )
    if (this.props.restore) this._loadStash()
    makeAutoObservable(this, { ui: false, windows: observable.shallow })
  }

  props!: VBrowserProps

  /** 窗口列表 */
  windows: VBrowserWindow[] = []
  /** 选中窗口索引 */
  activeIndex = 0
  /** 选中窗口 */
  get activeWindow() {
    return this.windows[this.activeIndex]
  }

  /** 切换已打开tab */
  switchWindow(w: number | VBrowserWindow) {
    const oldWindow = typeof w === 'number' ? this.windows[w] : w
    if (typeof w === 'number') {
      this.activeIndex = w
    } else {
      const index = this.windows.findIndex((item) => item.path === w.path)
      if (index === -1) {
        console.warn('switchTab error: not found', w)
      }
      this.activeIndex = index
    }
    this.props.onChange && this.props.onChange(oldWindow, this.activeWindow, this.windows)
  }

  /** 打开新窗口，已存在则切换 */
  async open(w: VBrowserWindow) {
    let pass = true
    const auth = this.props.auth || (() => true)
    // @ts-ignore
    if (auth[Symbol.toStringTag] === 'AsyncFunction') {
      pass = (await auth(this.activeWindow, w)) ?? false
    } else {
      pass = (auth(this.activeWindow, w) as boolean) ?? false
    }
    if (!pass) return
    const index = this.windows.findIndex((item) => item.path === w.path)
    if (index === -1) {
      if (this.props.maxLength && this.windows.length >= this.props.maxLength) {
        const error = new Error('超过最大允许的窗口数量')
        this.props.onError && this.props.onError(error)
        throw error
      }
      this.windows.push({ ...w, closeable: w.closeable ?? true })
    } else {
      Object.assign(this.windows[index], w)
    }

    this.props.onChange && this.props.onChange(this.activeWindow, w, this.windows)
    this.activeIndex = this.windows.findIndex(({ path }) => path === w.path)

    this._stash()
  }

  /** 关闭窗口 */
  close(i: number | VBrowserWindow) {
    if (typeof i !== 'number') {
      i = this.windows.findIndex((item) => item.path === (i as VBrowserWindow).path)
    }
    const originWindows = this.windows.slice()
    const activeWindow = this.activeWindow
    this.windows.splice(i, 1)
    delete this._cache[i]
    if (this.activeIndex === i) {
      this.activeIndex = this.windows[i + 1] ? i : i - 1
    } else {
      this.activeIndex = this.windows.indexOf(activeWindow)
    }
    this._stash()
  }

  scrollToActiveTab() {
    const tabEl: HTMLDivElement | null = document.querySelector(
      `[data-tab-id="${this.activeWindow.path}"]`
    )
    if (!tabEl) return
    tabEl.scrollIntoView()
  }

  /** 注意：重新渲染ui会造成窗口内组件状态丢失 */
  ui!: JSX.Element

  mounted = false

  /** 窗口组件的缓存 */
  private _cache: { [key: string]: CacheItem } = {}
  /** 设置缓存 */
  private _setCache(key: string, { vNode }: CacheItem) {
    this._cache[key] = { vNode }
  }

  /** ui挂载成功 */
  private async _onMounted() {
    this.mounted = true
  }
  // #endregion

  // #region 保存/恢复已开窗口
  private async _stash() {
    const windows = this.windows.slice().map((item) => ({ ...item }))
    const string = JSON.stringify(windows)
    localStorage.setItem('vbrowser-windows', string)
  }

  private _loadStash() {
    const windows: VBrowserWindow[] = JSON.parse(
      localStorage.getItem('vbrowser-windows') || '[]'
    )
    this.windows = windows
  }
  // #endregion
}

export default VBrowser
