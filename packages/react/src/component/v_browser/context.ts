import { noop } from 'lodash'
import { createContext } from 'react'
import { VBrowser } from '.'

const Context = createContext<{
  portalContainer: HTMLDivElement
  activeWindow: VBrowser['activeWindow']
  cache: VBrowser['_cache']
  setCache: VBrowser['_setCache']
  onMounted: () => void
}>({
  portalContainer: document.createElement('div'),
  activeWindow: { path: '' },
  cache: {},
  setCache: noop,
  onMounted: noop,
})
Context.displayName = 'VBrowserContext'
export default Context
