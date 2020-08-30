import { CSSProperties, ReactNode } from 'react'

type PopoverTrigger = 'focus' | 'click' | 'hover' | 'realFocus'
type Popup = (() => ReactNode) | ReactNode

interface PopoverProps {
  type?: PopoverTrigger
  popup: Popup
  disabled?: boolean
  right?: boolean
  top?: boolean
  center?: boolean
  offset?: number
  showArrow?: boolean
  arrowLeft?: string | number
  pureContainer?: boolean
  isInPopup?: boolean
  predictingHeight?: number
  className?: string
  style?: CSSProperties
}

export type { Popup, PopoverTrigger, PopoverProps }
