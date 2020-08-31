import React from 'react'
import moment from 'moment'
import { observable } from 'mobx'

import TimeSpanPicker from './time_span_picker'
import TimeSpan from './time_span'

const store = observable({
  date: moment().startOf('day').toDate(),
  customDate: moment().hour(10).minute(30).toDate(),
  setDate(date: any) {
    this.date = date
  },
  setCustomDate(date: any) {
    this.customDate = date
  },
})

export const ComTimeSpan = () => (
  <TimeSpan time={store.date} onChange={(date) => store.setDate(date)} />
)

export const ComTimeSpanPicker = () => (
  <TimeSpanPicker date={store.date} onChange={(date) => store.setDate(date)} />
)

export const ComTimeSpanPickerWithDisabledSpan = () => (
  <TimeSpanPicker
    date={store.date}
    onChange={(date) => store.setDate(date)}
    disabledSpan={(spanMoment) =>
      moment(spanMoment).isSameOrAfter(moment('11:00', 'HH:mm')) &&
      moment(spanMoment).isSameOrBefore(moment('18:30', 'HH:mm'))
    }
  />
)

export const ComTimeSpanPickerWithSpan = () => (
  <TimeSpanPicker
    date={store.date}
    max={moment().hour(23).minute(0).toDate()}
    span={60 * 60 * 1000}
    onChange={(date) => store.setDate(date)}
  />
)

export const ComTimeSpanPickerWithChildren = () => (
  <TimeSpanPicker date={store.date} onChange={(date) => store.setDate(date)}>
    <span>{store.date ? moment(store.date).format('HH:mm') : '请点击选择'}</span>
  </TimeSpanPicker>
)

export const ComTimeSpanPickerWithCustomTime = () => (
  <TimeSpanPicker
    date={store.customDate}
    beginTime={moment().hour(8).minute(30).toDate()}
    endTime={moment().hour(22).minute(30).toDate()}
    span={60 * 60 * 1000}
    onChange={(date) => store.setCustomDate(date)}
  />
)

export default {
  title: '表单/TimeSpanPicker',
}
