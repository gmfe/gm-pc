import { CSSProperties, ReactNode } from 'react'
import { anyCallback } from '../../types'

type PopoverTrigger = 'focus' | 'click' | 'hover' | 'realFocus'
type Popup = ((closePopover: anyCallback) => ReactNode) | ReactNode

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
  onVisibleChange?: (value: boolean) => void
}

export type { Popup, PopoverTrigger, PopoverProps }
