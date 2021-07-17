import { useState, useEffect, useRef, RefObject } from 'react'

export type ActionHorizontalType = 'top' | 'bottom' | 'stop'
export type ActionVerticalType = 'right' | 'left' | 'stop'

const TIME = 100

type TimerType = ReturnType<typeof setTimeout>

export interface ClientType {
  x: number | null
  y: number | null
}

export interface ClientDataType {
  pre: ClientType | null
  now: ClientType | null
}

const useMouseAction = (ref: RefObject<HTMLElement>) => {
  const lockTime = useRef<number>(Date.now())
  const timer = useRef<TimerType | null>(null)

  const [newClient, setNewClient] = useState<ClientDataType>({ now: null, pre: null })
  const [client, setClient] = useState<ClientType>({ x: null, y: null })

  const [verticalAction, setVerticalAction] = useState<ActionVerticalType>('stop')
  const [horizontalAction, setHorizontalAction] = useState<ActionHorizontalType>('stop')

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e
        setClient({ x: clientX, y: clientY })
      })
    }
  }, [ref])

  useEffect(() => {
    if (newClient.now && newClient.pre) {
      if (newClient.pre.x && newClient.now.x) {
        if (newClient.pre.x < newClient.now.x) {
          setVerticalAction('right')
        } else if (newClient.pre.x === newClient.now.x) {
          setVerticalAction('stop')
        } else {
          setVerticalAction('left')
        }
      }

      if (newClient.pre.y && newClient.now.y) {
        if (newClient.pre.y < newClient.now.y) {
          setHorizontalAction('bottom')
        } else if (newClient.pre.y === newClient.now.y) {
          setHorizontalAction('stop')
        } else {
          setHorizontalAction('top')
        }
      }
    }
  }, [newClient])

  // 价格更新坐标
  useEffect(() => {
    // 鼠标移动过程中，移除定时器
    clearTimeout(timer.current as TimerType)

    timer.current = setTimeout(() => {
      setNewClient({
        pre: client,
        now: client,
      })
    }, TIME)

    const nowTime = Date.now()
    if (Date.now() - lockTime.current >= TIME) {
      if (newClient.now && newClient.now.x !== client.x) {
        setNewClient({
          pre: { x: newClient.now?.x || client.x, y: newClient.now?.y || client.y },
          now: client,
        })
      }
      lockTime.current = nowTime
    }
  }, [client])

  return {
    vertical: verticalAction,
    horizontal: horizontalAction,
    clientX: client.x,
    clientY: client.y,
  }
}

export default useMouseAction
