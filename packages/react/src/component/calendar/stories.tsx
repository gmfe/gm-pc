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

export const ComCaledar = () => (
  <Calendar
    selected={store.selected}
    onSelect={(selected) => store.setSelected(selected)}
  />
)

export const ComCalendarWithMinAndMax = () => (
  <>
    设置min, max
    <Calendar
      selected={store.selected}
      onSelect={(selected) => store.setSelected(selected)}
      min={moment().toDate()}
      max={moment().add(10, 'd').toDate()}
    />
    设置disabledDate
    <Calendar
      selected={store.selected}
      onSelect={(selected) => store.setSelected(selected)}
      disabledDate={(d) => {
        return moment(d).get('day') === 5
      }}
    />
  </>
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
