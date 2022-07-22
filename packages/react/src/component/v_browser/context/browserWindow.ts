import { createContext } from 'react'
import { VBrowserWindow } from '../types'

const BrowserWindowContext = createContext<string>(undefined as any)
BrowserWindowContext.displayName = 'VBrowserWindowContext'

export default BrowserWindowContext
