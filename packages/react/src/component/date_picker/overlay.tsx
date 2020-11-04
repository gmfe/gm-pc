import React, { FC, useState } from 'react'
import _ from 'lodash'
import moment from 'moment'

import { TimeLimit } from './types'
import { Flex } from '../flex'
import { Calendar } from '../calendar'
import { Button } from '../button'
import { getLocale } from '@gm-pc/locales'
import { getTimeCells, setTimes } from '../../common/utils/date'
import TimeSelect from './time_select'

interface OverlayProps {
  date?: Date
  willActiveSelected: Date | null
  min?: Date
  max?: Date
  onSelect(date: Date | null): void
  disabledDate?(date: Date): boolean
  timeLimit: TimeLimit
  enabledTimeSelect?: boolean
}

const Overlay: FC<OverlayProps> = ({
  date,
  willActiveSelected,
  min,
  max,
  onSelect,
  timeLimit,
  disabledDate,
  enabledTimeSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(date)

  // 选择日期后渲染时间，有默认时间则展示，无展示为可选的第一个时间
  const getTime = (currentDate: Date): Date => {
    const { defaultTime, disabledSpan, timeSpan } = timeLimit
    if (defaultTime) {
      return defaultTime
    }
    const cells = getTimeCells(timeSpan!)
    cells.pop() // 去掉 24:00
    let index = 0
    if (disabledSpan) {
      index = _.findIndex(cells, (cell) => {
        const _cell = setTimes(moment(currentDate), cell)
        const disabled = disabledSpan(_cell.toDate(), currentDate)
        return !disabled
      })
    }
    return cells[index].toDate()
  }

  const _handelSelect = (value: Date, type: 'date' | 'time'): void => {
    if (!enabledTimeSelect) {
      onSelect(value)
      return
    }
    let date: Date
    let time: Date
    if (type === 'date') {
      date = value
      time = getTime(value)
    } else {
      date = selectedDate!
      time = value
    }
    const newDate = setTimes(moment(date), moment(time)).toDate()
    setSelectedDate(newDate)
  }

  return (
    <Flex column className='gm-date-picker-overlay'>
      <Calendar
        className='gm-date-picker-overlay-calendar'
        selected={selectedDate}
        onSelect={(value) => _handelSelect(value, 'date')}
        willActiveSelected={willActiveSelected!}
        min={min}
        max={max}
        disabledDate={disabledDate}
      />
      <TimeSelect
        date={selectedDate}
        timeLimit={timeLimit}
        onSelectTime={(value) => _handelSelect(value, 'time')}
        enabledTimeSelect={enabledTimeSelect}
      />
      {enabledTimeSelect && (
        <Flex justifyEnd className='gm-border-top gm-padding-lr-10 gm-padding-tb-5'>
          <Button
            type='primary'
            className='gm-padding-lr-20'
            disabled={!selectedDate}
            onClick={() => onSelect(selectedDate!)}
            style={{ height: '28px' }}
          >
            {getLocale('确定')}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
export default Overlay
