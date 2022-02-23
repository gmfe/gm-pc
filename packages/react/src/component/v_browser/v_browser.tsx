import React from 'react'
import { noop } from 'lodash'
import { makeAutoObservable } from 'mobx'
import { Observer } from 'mobx-react'
import { VBrowserContainer } from './ui'
import Context from './context'

export interface VBrowserWindow {
  path: string
  query?: { [key: string]: string }
  title?: string
  closeable?: boolean
}

export interface VBrowserProps {
  /** 设置初始窗口列表 */
  defaultWindows: VBrowserWindow[]
  /** VBrowser挂载完成 */
  onMounted?: VBrowser['onMounted']
  /** 窗口变化事件 */
  onChange?: VBrowser['onChange']
  /** 窗口打开/切换前调用，返回false会阻止窗口打开/切换 */
  auth?: VBrowser['auth']
}

export interface CacheItem {
  vNode: JSX.Element & {
    ref: {
      current: HTMLDivElement | undefined
    }
  }
}

export enum VBrowserEvent {
  /** 更新UI */
  UI_UPDATE = 'update',
  /** 已更新UI */
  UI_UPDATED = 'updated',
  /** 页面显示 */
  PAGE_SHOW = 'show',
}

class VBrowser {
  constructor({ defaultWindows, onChange, onMounted, auth = () => true }: VBrowserProps) {
    this.onChange = onChange || noop
    this.onMounted = onMounted || noop
    this._defaultWindows = defaultWindows
    this.ui = (
      <Observer>
        {() => (
          <Context.Provider value={this._value}>
            <VBrowserContainer data-vbrowser='' />
          </Context.Provider>
        )}
      </Observer>
    )
    this.auth = auth
    makeAutoObservable(this, { ui: false })
  }

  // #region 窗口管理
  _defaultWindows: VBrowserWindow[] = []
  /** 窗口列表 */
  windows: VBrowserWindow[] = []
  /** 选中窗口索引 */
  private _activeIndex = 0
  /** 选中窗口 */
  get activeWindow() {
    return this.windows[this._activeIndex]
  }

  readonly onMounted!: () => void
  /** 跳转鉴权 */
  auth!: (from?: VBrowserWindow, to?: VBrowserWindow) => Promise<boolean> | boolean
  /** 窗口变化 */
  readonly onChange!: (
    from: VBrowserWindow,
    to: VBrowserWindow,
    windows: VBrowserWindow[]
  ) => void

  private _onChange(from: VBrowserWindow, to: VBrowserWindow) {
    this.onChange(from, to, this.windows)
    //
  }

  /** 打开新窗口，已存在则切换 */
  async open(w: VBrowserWindow) {
    const index = this.windows.findIndex((item) => item.path === w.path)
    if (index === -1) {
      this.windows.push(w)
    }
    this._activeIndex = this.windows.indexOf(w)
    let pass = true
    // @ts-ignore
    if (this.auth[Symbol.toStringTag] === 'AsyncFunction') {
      pass = (await this.auth(this.activeWindow, w)) ?? false
    } else {
      pass = (this.auth(this.activeWindow, w) as boolean) ?? false
    }
    if (!pass) return
    return this._updateUI(w)
  }

  /** 在当前窗口进入到新页面 */
  async go(w: VBrowserWindow) {
    //
  }

  /** 返回上一页面 */
  async back() {
    //
  }

  /** 关闭窗口 */
  close() {
    delete this._cache[this.activeWindow.path]
  }
  // #endregion

  // #region UI
  /** 注意：重新渲染ui会造成窗口内组件状态丢失 */
  ui!: JSX.Element

  /** 窗口组件的缓存 */
  private _cache: { [key: string]: CacheItem } = {}
  /** 设置缓存 */
  private _setCache(key: string, { vNode }: CacheItem) {
    this._cache[key] = { vNode }
  }

  /** Provider value */
  get _value() {
    return {
      portalContainer: document.createElement('div'),
      cache: this._cache,
      activeWindow: this.activeWindow || {},
      setCache: this._setCache.bind(this),
      onMounted: this._onMounted.bind(this),
    }
  }

  /** 显示activeWindow */
  private async _updateUI(w: VBrowserWindow): Promise<VBrowserWindow> {
    const from = this.activeWindow
    const { path } = w
    return new Promise((resolve, reject) => {
      dispatchEvent(
        new CustomEvent(VBrowserEvent.UI_UPDATE, {
          detail: w,
        })
      )
      const onUpdated = (e: any) => {
        if (e.detail !== path) return
        removeEventListener(VBrowserEvent.UI_UPDATED, onUpdated)
        this._onChange(from, w)
        resolve(w)
      }
      addEventListener(VBrowserEvent.UI_UPDATED, onUpdated)
      setTimeout(() => reject(new Error('打开窗口超时')), 5000)
    })
  }

  /** ui挂载成功 */
  private async _onMounted() {
    console.log('mounted')
    for (const w of this._defaultWindows.reverse()) {
      await this.open(w)
    }
  }

  // #endregion

  // #region  边框管理
  /** 是否显示边框 */
  private _showFrame = true
  /** 见hideFrame方法 */
  private _autoShowFrame = true

  /**
   * 隐藏虚拟浏览器边框，只显示内容，
   * - options.autoShowFrame: 默认为true，是否离开当前窗口后，自动恢复显示
   */
  hideFrame({ autoShowFrame = true }) {
    this._autoShowFrame = autoShowFrame
    //
  }

  showFrame() {
    this._showFrame = false
  }
  // #endregion
}

export default VBrowser
