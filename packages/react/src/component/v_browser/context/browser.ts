import { createContext } from 'react'
import VBrowser from '../v_browser'

const BrowserContext = createContext<VBrowser>(undefined as any)
BrowserContext.displayName = 'VBrowserContext'

export default BrowserContext
