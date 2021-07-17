import { useEffect, useState, useRef, RefObject } from 'react'
import useMouseAction from './use_mouse_action'
import _ from 'lodash'

type onClearType = () => void

export interface Client {
  clientX: number | null
  clientY: number | null
}

/**
 * 监听容器的行为，并返回其子组件对应的下标
 * 目前只支持右移锁上
 * @param ref 监听容器的 ref
 * @param itemHeight 导航的item的高
 * @param initIndex 初始化的下标
 * @returns [index, handleMouseMove(), clear()]
 */
const useContainerListen = (
  ref: RefObject<HTMLElement>,
  itemHeight = 50,
  initIndex = -1
): [number, onClearType] => {
  const { vertical, clientX, clientY } = useMouseAction(ref)
  const [index, setIndex] = useState(initIndex)
  const preIndex = useRef(initIndex)
  const hasIn = useRef(false) // 判断是否在容器内部
  const lock = useRef(false) // 行为锁
  const rect = useRef<DOMRect | null>(null)

  useEffect(() => {
    rect.current = ref.current?.getBoundingClientRect() || null
  }, [ref])

  useEffect(() => {
    lock.current = vertical === 'right'
  }, [vertical])

  useEffect(() => {
    if (rect.current && clientX && clientY !== null) {
      // 判断鼠标是否在容器内
      hasIn.current = clientX <= rect.current.width
      // 向下取整，计算对应 index
      preIndex.current = Math.floor((clientY - rect.current.top) / itemHeight)
      if (hasIn.current && !lock.current) {
        setIndex(preIndex.current)
      }
    }
  }, [clientX, clientY])

  const clearCallBack = () => {
    setIndex(-1)
  }

  return [index, clearCallBack]
}

export default useContainerListen
