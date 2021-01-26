import React from 'react'
import { observable } from 'mobx'
import moment from 'moment'

import Calendar from './calendar'
import RangeCalendar from './range_calendar'

const store = observable({
  selected: null,
  setSelected(date: any) {
    this.selected = date
  },
})

const rangeStore = observable({
  begin: null,
  end: null,
  setSelected(begin: any, end: any) {
    console.log(begin, end)
    this.begin = begin
    this.end = end
  },
})

export const ComCalendar = () => (
  <Calendar
    selected={store.selected}
    onSelect={(selected) => store.setSelected(selected)}
  />
)

export const ComCalendarWithMinAndMax = () => (
  <div>
    <div className='gm-margin-tb-10'>设置min, max</div>
    <Calendar
      selected={store.selected}
      onSelect={(selected) => store.setSelected(selected)}
      min={moment().toDate()}
      max={moment().add('d', 10).toDate()}
    />
  </div>
)

export const ComRangeCalendar = () => (
  <RangeCalendar
    begin={rangeStore.begin}
    end={rangeStore.end}
    onSelect={(begin, end) => rangeStore.setSelected(begin, end)}
  />
)

export default {
  title: '表单/Calendar',
}
