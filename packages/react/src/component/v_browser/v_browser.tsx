import React from 'react'
import { makeAutoObservable, observable, reaction, when } from 'mobx'
import VBrowserContainer from './ui/index'
import BrowserContext from './context/browser'
import { CacheItem, VBrowserProps, VBrowserWindow } from './types'
import { parse, stringify } from 'querystring'
import { isEqual } from 'lodash'

// @ts-ignore
const req = require.context('@/pages', true, __AUTO_ROUTER_REG__, 'lazy')
export const pages = req.keys().map((key) => {
  return {
    path: key.replace(/^\./, '').replace('/index.page.tsx', ''),
    loader: () => Promise.resolve(req(key)),
  }
})

const STORAGE_KEY = 'vbrowser-cache'

type EventName = 'error' | 'change' | 'close' | 'show'

interface VBrowser {
  on(e: 'error', fn: (err: Error) => void): void
  on(e: 'change', fn: (to: VBrowserWindow, from: VBrowserWindow) => void): void
  on(e: 'close', fn: (w: VBrowserWindow) => void): void
  on(e: 'show', fn: (w: VBrowserWindow) => void): void
}

class VBrowser implements VBrowser {
  constructor(props: VBrowserProps) {
    this.props = props
    this.props.restore = this.props.restore ?? true
    this.ui = (
      <BrowserContext.Provider value={this}>
        <VBrowserContainer />
      </BrowserContext.Provider>
    )
    this._loadStash().then(async () => {
      await when(() => this.mounted)
      this.props.onReady && this.props.onReady()
      return null
    })
    makeAutoObservable(this, { ui: false, windows: observable.shallow })
  }

  props!: VBrowserProps

  /** 窗口列表 */
  windows: VBrowserWindow[] = []
  /** 选中窗口索引 */
  activeIndex = -1
  /** 选中窗口 */
  get activeWindow() {
    return this.windows[this.activeIndex] as VBrowserWindow | undefined
  }

  /** 切换已打开窗口 */
  switchWindow(w: number | VBrowserWindow) {
    const oldWindow = this.activeWindow
    if (typeof w === 'number') {
      this.activeIndex = w
    } else {
      const index = this.windows.findIndex((item) => item.path === w.path)
      if (index === -1) {
        throw new Error(`窗口不存在（${w.path} ）`)
      }
      this.activeIndex = index
    }
    setTimeout(() => this._scrollToActiveTab(), 100)

    this.props.onChange &&
      this.props.onChange(oldWindow, this.windows[this.activeIndex], this.windows)
    this._stash()
  }

  /** 打开新子窗口,路由已打开则判断query是否相等，相等则切换，不相等则销毁重新加载，未打开则新建子窗口
   *
   * target为'_blank'时，新开浏览器窗口
   */
  async open(
    w: VBrowserWindow | string,
    { target = '_self' }: { target: '_self' | '_blank' } = { target: '_self' }
  ) {
    await when(() => this.mounted)
    // #region 格式化
    if (typeof w === 'string') {
      w = { path: w.split('?')[0], query: parse(w.split('?')[1]) as {} }
    }
    w.closeable = w.closeable ?? true
    w.title = w.title ?? (this.props.autoTitle && this.props.autoTitle(w.path)) ?? '-'
    // #endregion

    // #region 鉴权
    let pass = true
    const auth = this.props.auth || (() => true)
    // @ts-ignore
    if (auth[Symbol.toStringTag] === 'AsyncFunction') {
      pass = (await auth(this.activeWindow, w as VBrowserWindow)) ?? false
    } else {
      pass = (auth(this.activeWindow, w as VBrowserWindow) as boolean) ?? false
    }
    if (!pass) return this._fire('error', new Error('鉴权失败'))
    if (!pages.find((p) => p.path === (w as VBrowserWindow).path)) {
      console.error(w.path, '页面不存在')
    }
    // #endregion

    // #region 打开新子窗口
    if (target === '_self') {
      const index = this.windows.findIndex(
        (item) => item.path === (w as VBrowserWindow).path
      )
      if (index === -1) {
        if (this.props.maxLength && this.windows.length >= this.props.maxLength) {
          this.props.onError &&
            this.props.onError({ code: 0, message: '超过最大允许的窗口数量' })
          return
        }
        this.windows.push(w)
      } else {
        /**
         * 打开已存在的相同路由的子窗口，此时情况比较复杂
         * 当前浏览器窗口中不能开多个相同路由的子窗口，因为存在store共用冲突
         *   如果参数相同，切换到已存在的窗口
         *   如果不相同，销毁旧窗口重新新建，以重新触发其中的生命周期
         */
        const oldW = this.windows[index]
        if (!isEqual(oldW.query, w.query)) {
          // 删除缓存，使其需要重建
          delete this._cache[w.path]
        }
        Object.assign(this.windows[index], w)
      }

      this.switchWindow(w as VBrowserWindow)
    }
    // #endregion

    // #region 打开新浏览器窗口
    if (target === '_blank') {
      // 避免继承
      const currentCache = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
      const newCache = { windows: [] as VBrowserWindow[], activeIndex: 0 }
      newCache.windows.push(...this.windows.filter((w) => !w.closeable))
      newCache.windows.push(w)
      newCache.activeIndex = newCache.windows.findIndex(
        (item) => item.path === (w as VBrowserWindow).path
      )
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newCache))
      window.open(`#${w.path}?${stringify(w.query || {})}`, '_blank')
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentCache))
    }
    // #endregion
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
      const left = originWindows.slice(0, i).reverse()[0]
      const right = originWindows.slice(i + 1, originWindows.length)[0]
      const to = this.windows.findIndex(
        (w) => w.path === left?.path || w.path === right?.path
      )
      this.switchWindow(to)
    } else {
      this.switchWindow(this.windows.indexOf(activeWindow!))
    }
  }

  private _scrollToActiveTab() {
    const tabEl: HTMLDivElement | null = document.querySelector(
      `[data-tab-id="${this.activeWindow?.path}"]`
    )
    if (!tabEl) return
    tabEl.scrollIntoView()
  }

  readonly ui!: JSX.Element

  /** ui是否已挂载 */
  mounted = false

  /** 是否隐藏标签栏 */
  private _hidingTabs = false

  private readonly _portal = document.createElement('div')

  /** 窗口组件的缓存 */
  private _cache: { [key: string]: CacheItem } = {}
  /** 设置缓存 */
  private _setCache(key: string, { vNode }: CacheItem) {
    // key被重新设置会使原有的子窗口被销毁
    this._cache[key] = { vNode }
  }

  // 保存已开窗口
  private async _stash() {
    const windows = this.windows.slice().map((item) => ({ ...item }))
    const string = JSON.stringify({
      windows,
      activeIndex: this.activeIndex,
    })
    sessionStorage.setItem(STORAGE_KEY, string)
  }

  // 恢复已开窗口
  private _loadStash() {
    return new Promise((resolve, reject) => {
      const { windows = [], activeIndex = 0 } = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || '{}'
      )
      if (windows.length === 0) return resolve(undefined)
      this.windows = windows
      const onShow = (w: VBrowserWindow) => {
        this.switchWindow(activeIndex)
        this.off('show', onShow)
        resolve(undefined)
      }
      this.on('show', onShow)
    })
  }

  /** 隐藏标签栏  */
  hideTabs() {
    this._hidingTabs = true
  }

  /** 显示标签栏  */
  showTabs() {
    this._hidingTabs = false
  }

  private _events: {
    [eventName: string]: Array<{ event: Function }>
  } = {}

  on(eventName: EventName, event: Function) {
    if (!this._events[eventName]) {
      this._events[eventName] = []
    }
    this._events[eventName].push({ event })
    return this
  }

  off(eventName: EventName, event: Function) {
    const events = this._events[eventName] || []
    const index = events.findIndex((item) => item.event === event)
    events.splice(index, 1)
  }

  private _fire(eventName: EventName, ...args: any[]) {
    const events = this._events[eventName] || []
    events.forEach((item) => item.event(...args))
  }
}

export default VBrowser
