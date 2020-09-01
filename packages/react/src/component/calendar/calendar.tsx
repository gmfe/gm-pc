import React, { FC } from 'react'
import _ from 'lodash'

import RangeCalendar from './range_calendar'
import { CalendarProps } from './types'

const Calendar: FC<CalendarProps> = (props) => {
  const { selected, onSelect, ...rest } = props

  const handleSelect = (begin: Date): void => {
    onSelect && onSelect(begin)
  }

  return (
    <RangeCalendar
      {...rest}
      begin={selected}
      end={selected}
      onSelect={handleSelect}
      disabledYearAndMonth={undefined}
    />
  )
}

export default Calendar
