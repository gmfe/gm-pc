import React, { FC, ReactNode, useRef } from 'react'
import { Popover } from '../popover'
import ColorSelect from './color_select'

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  children: ReactNode
}

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange, children }) => {
  const refPopover = useRef<Popover>(null)

  const handleConfirm = (color: string): void => {
    // eslint-disable-next-line no-unused-expressions
    refPopover.current?.apiDoSetActive(false)

    onChange && onChange(color)
  }

  const handleCancel = (): void => {
    // eslint-disable-next-line no-unused-expressions
    refPopover.current?.apiDoSetActive(false)
  }

  return (
    <Popover
      ref={refPopover}
      type='click'
      showArrow
      popup={
        <ColorSelect
          defaultColor={value}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      }
    >
      {children}
    </Popover>
  )
}

export default ColorPicker
export type { ColorPickerProps }
