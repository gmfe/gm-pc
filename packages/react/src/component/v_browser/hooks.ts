import React, { useState, useEffect, useContext } from 'react'

import { useLocation } from 'react-router-dom'
import Context from './context'

/**
 * 当前窗口在VBrowser中获得焦点后调用
 */
export function useVWindowShow<T>(cb: () => Function | void) {
  const context = useContext(Context)
  useEffect(() => {
    //
    addEventListener('')
    return () => {
      //
    }
  }, [])
  // if (context.activeWindow.path !== pathname) return
  // const cb = onHide()
}
