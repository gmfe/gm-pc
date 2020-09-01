import React, { FC, useRef } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import { Popover } from '../popover'
import { Selection } from '../selection'
import TimeSpan from './time_span'
import { TimeSpanPickerProps } from './types'
import { renderItemFunc } from './util'

const TimeSpanPicker: FC<TimeSpanPickerProps> = ({
  min,
  max,
  disabledSpan,
  span,
  date,
  children,
  disabled,
  renderItem = renderItemFunc,
  onChange,
  className,
  isInPopup,
  enabledEndTimeOfDay,
  beginTime,
  endTime,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)

  const handleSelectTime = (date: Date): void => {
    popoverRef.current!.apiDoSetActive()
    onChange && onChange(date)
  }

  const handleSelect = (): void => {
    onChange && onChange(null)
  }

  const popup = (
    <TimeSpan
      beginTime={beginTime}
      endTime={endTime}
      min={min}
      max={max}
      span={span}
      time={date}
      onChange={handleSelectTime}
      disabledSpan={disabledSpan}
      renderItem={renderItem}
      enabledEndTimeOfDay={enabledEndTimeOfDay}
    />
  )

  const selected = date ? { value: date, text: renderItem!(date) } : null

  return (
    <Popover popup={popup} ref={popoverRef} isInPopup={isInPopup}>
      {children ?? (
        <Selection
          {...rest}
          selected={selected}
          onSelect={handleSelect}
          className={classNames('gm-time-span-picker', className)}
          disabled={disabled}
          disabledClose
        />
      )}
    </Popover>
  )
}

export default TimeSpanPicker
