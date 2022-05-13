/* eslint-disable dot-notation */
import React, { createRef, FC, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import Context from '../context/browser'
import { pages } from '../v_browser'
import WindowWrapper from './window_wrapper'
import './style.less'
import Delete from '../../../svg/vbrowser-tab-delete.svg'
import Left from '../../../svg/vbrowser-tab-left.svg'
import Right from '../../../svg/vbrowser-tab-right.svg'
import { clamp, throttle } from 'lodash'
import BrowserWindowContext from '../context/browserWindow'

const VBrowserContainer: FC<{ className?: string }> = ({ className, ...props }) => {
  const containerRef = createRef<HTMLDivElement>()
  const browser = useContext(Context)
  const leftInterval = useRef<number>()
  const rightInterval = useRef<number>()

  const [state, setState] = useState({ scrollLeft: 0, scrollWidth: 0, width: 0 })

  useEffect(() => {
    browser['_onMounted']()
  }, [])

  useEffect(() => {
    const wrapper: HTMLDivElement | null = document.querySelector('.v-browser-tabs-items')
    if (!wrapper) return
    const onScroll = throttle(() => {
      setState({
        width: wrapper.getBoundingClientRect().width,
        scrollWidth: wrapper.scrollWidth,
        scrollLeft: wrapper.scrollLeft,
      })
    }, 20)
    wrapper.addEventListener('scroll', onScroll)
    onScroll()
    return () => {
      wrapper.removeEventListener('scroll', onScroll)
    }
  }, [browser.windows.length])

  const renderPage = (activeElement: HTMLDivElement) => {
    const container = containerRef.current!
    container.appendChild(activeElement)
  }
  // 页面创建
  const _handleCreate = (path: string) => {
    const el = browser['_cache'][path].vNode.ref.current
    if (!el) return
    renderPage(el)
  }
  // 激活页面
  const _handleOnShow = (path: string) => {
    const el = browser['_cache'][path].vNode.ref.current
    if (!el) return
    const container = containerRef.current!
    const children = (container.childNodes as any) as HTMLDivElement[]
    children.forEach((child) => child.parentNode!.removeChild(child))
    renderPage(el)
  }
  // 失活页面
  const _handleOnHide = (path: string) => {
    //
  }

  const _handleScroll = (offset: number) => {
    const wrapper = document.querySelector('.v-browser-tabs-items')
    if (!wrapper) return
    wrapper.scrollTo({
      left: clamp(wrapper.scrollLeft + offset, 0, wrapper.scrollWidth),
      behavior: 'smooth',
    })
  }

  const container = useRef(
    <div className='v-browser-window-wrapper'>
      <div
        className={classNames('v-browser-window', className)}
        ref={containerRef}
        {...props}
      />
      {createPortal(
        pages.map((page, i) => {
          return (
            <BrowserWindowContext.Provider key={i} value={page}>
              <WindowWrapper
                key={i}
                path={page.path}
                onCreate={_handleCreate}
                onShow={_handleOnShow}
                onHide={_handleOnHide}
              />
            </BrowserWindowContext.Provider>
          )
        }),
        document.createElement('div')
      )}
    </div>
  )
  return (
    <div className='v-browser tw-relative'>
      <div className='v-browser-tabs tw-w-full tw-flex tw-items-center tw-overflow-x-auto tw-shadow'>
        <div
          className={classNames('v-browser-tabs-left tw-font-sm tw-px-2.5', {
            disabled: state.scrollLeft === 0,
          })}
          // onClick={(e) => {
          //   e.stopPropagation()
          //   _handleScroll(-150)
          // }}
          onMouseEnter={() => {
            leftInterval.current = setInterval(() => {
              _handleScroll(-15)
            })
          }}
          onMouseLeave={() => {
            clearInterval(leftInterval.current)
          }}
        >
          <Left
            className={classNames(
              'v-browser-tabs-arrow tw-w-3.5 tw-h-3.5 tw-text-gray-500',
              {}
            )}
          />
        </div>
        <div className='v-browser-tabs-items tw-w-full tw-h-full tw-flex tw-items-center'>
          {browser.windows.map((w, i) => {
            return (
              <div
                key={i}
                className={classNames(
                  'v-browser-tabs-items-item tw-font-sm tw-px-2.5 tw-flex-shrink-0 tw-flex tw-items-center tw-truncate tw-w-min',
                  {
                    active: i === browser.activeIndex,
                    border:
                      i !== browser.windows.length - 1 &&
                      i !== browser.activeIndex &&
                      i !== browser.activeIndex - 1,
                  }
                )}
                data-tab-id={w.path}
                onClick={() => browser.switchWindow(w)}
              >
                <div
                  className='tw-flex-grow tw-text-sm'
                  style={{ minWidth: typeof w.title !== 'string' ? 'auto' : '100px' }}
                >
                  <div className='tw-flex tw-items-center'>
                    {w.faviconURL && (
                      <img
                        src={w.faviconURL}
                        className='tw-w-3.5 tw-h-3.5 tw-mr-0.5'
                        style={{ color: '#6A6A6A' }}
                      />
                    )}
                    <span>{w.title || '-'}</span>
                  </div>
                </div>

                <div className='tw-pl-2 tw-flex tw-items-center'>
                  <Delete
                    className={classNames(
                      'v-browser-tabs-items-item-close tw-w-3.5 tw-h-3.5',
                      {
                        'tw-hidden': !w.closeable,
                      }
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      browser.close(w)
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={classNames('v-browser-tabs-right tw-font-sm tw-px-2.5', {
            disabled: state.scrollWidth - state.width - state.scrollLeft === 0,
          })}
          // onClick={(e) => {
          //   e.stopPropagation()
          //   _handleScroll(150)
          // }}
          onMouseEnter={() => {
            rightInterval.current = setInterval(() => {
              _handleScroll(+15)
            })
          }}
          onMouseLeave={() => {
            clearInterval(rightInterval.current)
          }}
        >
          <Right
            className={classNames(
              'v-browser-tabs-arrow tw-w-3.5 tw-h-3.5 tw-text-gray-500'
            )}
          />
        </div>
      </div>
      {container.current}
    </div>
  )
}

export default observer(VBrowserContainer)
