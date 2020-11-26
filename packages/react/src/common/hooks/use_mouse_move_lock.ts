import { useEffect, useState, useRef, RefObject } from 'react'
import _ from 'lodash'

type ClearType = () => void

/**
 * 监听容器的鼠标行为，并返回其子组件对应的下标
 * 目前只支持右移锁上
 * @param ref 监听容器的 ref
 * @param initIndex 初始化的下标
 * @returns [index, clear()]
 */
const useMouseMoveLock = (
  ref: RefObject<HTMLElement>,
  initIndex = -1
): [number, ClearType] => {
  // 根据鼠标点到容器边缘的距离，由此判断移动方向
  const temp = useRef(0)
  // 控制hover
  const canHover = useRef(true)
  // 优化体验,设置计时器
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [index, setIndex] = useState(initIndex)

  useEffect(() => {
    if (ref.current) {
      _.forEach(ref.current.childNodes, (dom, i: number) => {
        dom.addEventListener('mousemove', (event: any) => {
          if (canHover.current) {
            setIndex(i)
          }
          checkActive(event.clientX)
        })
      })
      return () => {
        _.forEach(ref.current!.childNodes, (dom) => {
          dom.removeEventListener('mousemove', () => {})
        })
      }
    }
    return () => {}
  }, [ref])

  // 根据 navItem 的鼠标 x 坐标变化，控制 hover
  const checkActive = (mouseX: number) => {
    // 导航栏右侧 x 边界坐标值
    const maxX = ref.current!.getBoundingClientRect().width
    const nowTemp = maxX - mouseX
    // 比较前后，两次坐标差值，判断用户鼠标行为，是左滑或右滑
    if (nowTemp < temp.current) {
      // 右滑，锁hover
      canHover.current = false
      // 用户鼠标停止时，无法触发此事件，所以加入定时器，优化用户悬停情况下，自动解锁 hover
      clearTimeout(timer.current as ReturnType<typeof setTimeout>)
      const newTimer = setTimeout(() => {
        canHover.current = true
      }, 100)
      timer.current = newTimer
    } else {
      // 左滑，不锁 hover
      canHover.current = true
    }
    temp.current = nowTemp
  }

  const ClearCallBack = () => {
    setIndex(-1)
  }

  return [index, ClearCallBack]
}

export default useMouseMoveLock
