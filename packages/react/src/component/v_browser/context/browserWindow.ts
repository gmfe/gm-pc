import { createContext } from 'react'
import { VBrowserWindow } from '../types'

const BrowserWindowContext = createContext<VBrowserWindow>(undefined as any)
BrowserWindowContext.displayName = 'VBrowserWindowContext'

export default BrowserWindowContext
