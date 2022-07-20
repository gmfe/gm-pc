/* eslint-disable dot-notation */
import React, { createRef, FC, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import Context from '../context/browser'
import { pages } from '../v_browser'
import WindowWrapper from './window_wrapper'
import Delete from '../../../svg/vbrowser-tab-delete.svg'
import Left from '../../../svg/vbrowser-tab-left.svg'
import Right from '../../../svg/vbrowser-tab-right.svg'
import { clamp, throttle } from 'lodash'
import BrowserWindowContext from '../context/browserWindow'
import './style.less'

const VBrowserContainer: FC<{ className?: string }> = observer(
  ({ className, ...props }) => {
    const containerRef = createRef<HTMLDivElement>()
    const browser = useContext(Context)
    const leftInterval = useRef<number>()
    const rightInterval = useRef<number>()

    const [state, setState] = useState({ scrollLeft: 0, scrollWidth: 0, width: 0 })

    useEffect(() => {
      const container = containerRef.current
      if (container) {
        container.appendChild(browser['_portal'])
      }
      browser.mounted = true
    }, [])

    // #region  Tabs滚动处理
    useEffect(() => {
      const wrapper: HTMLDivElement | null = document.querySelector(
        '.v-browser-tabs-items'
      )
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

    const _handleScroll = (offset: number) => {
      const wrapper = document.querySelector('.v-browser-tabs-items')
      if (!wrapper) return
      wrapper.scrollTo({
        left: clamp(wrapper.scrollLeft + offset, 0, wrapper.scrollWidth),
      })
    }
    // #endregion

    const portal = useRef(
      createPortal(
        pages.map((page, i) => {
          return (
            <BrowserWindowContext.Provider key={i} value={page}>
              <WindowWrapper key={i} path={page.path} />
            </BrowserWindowContext.Provider>
          )
        }),
        browser['_portal']
      )
    )
    const ignored = browser.props.ignoredPath?.find((p) =>
      typeof p === 'string'
        ? p === browser.activeWindow?.path
        : p.test(browser.activeWindow?.path!)
    )
    return (
      <div
        className={classNames('v-browser tw-relative', {
          'hiding-tabs': browser['_hidingTabs'] || ignored,
        })}
      >
        <div
          className={classNames(
            'v-browser-tabs tw-w-full tw-flex tw-items-center tw-overflow-x-auto tw-shadow',
            { 'tw-hidden': browser['_hidingTabs'] || ignored }
          )}
        >
          <div
            className={classNames('v-browser-tabs-left tw-font-sm tw-px-2.5', {
              disabled: state.scrollLeft === 0,
              'tw-hidden': state.width === state.scrollWidth,
            })}
            // onClick={(e) => {
            //   e.stopPropagation()
            //   _handleScroll(-150)
            // }}
            onMouseEnter={() => {
              leftInterval.current = setInterval(() => {
                _handleScroll(-1)
              }, 0) as any
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
                          className={classNames('tw-w-3.5 tw-h-3.5 tw-mr-0.5', {
                            'tw-opacity-70': i !== browser.activeIndex,
                          })}
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
              disabled: state.scrollWidth - state.width - state.scrollLeft < 1,
              'tw-hidden': state.width === state.scrollWidth,
            })}
            // onClick={(e) => {
            //   e.stopPropagation()
            //   _handleScroll(150)
            // }}
            onMouseEnter={() => {
              rightInterval.current = setInterval(() => {
                _handleScroll(+1)
              }, 0) as any
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

        <div className='v-browser-window-wrapper'>
          <div
            className={classNames('v-browser-window', className, {
              'hiding-tabs': browser['_hidingTabs'] || ignored,
            })}
            ref={containerRef}
            {...props}
          />
          {portal.current}
        </div>
      </div>
    )
  }
)

export default VBrowserContainer
