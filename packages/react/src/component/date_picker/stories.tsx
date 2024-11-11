import React from 'react'
import moment from 'moment'
import { observable } from 'mobx'

import DatePicker from './date_picker'

const datePickerStatus = {
  date: new Date('2020-11-15 23:32:22'),
  setDate(date: Date | null) {
    console.log('selected date', date)
    this.date = date as any
  },
}

const commonStore = observable(datePickerStatus)
const inputValueRenderStore = observable(datePickerStatus)
const disabledStore1 = observable(datePickerStatus)
const disabledStore2 = observable(datePickerStatus)
const disabledStore3 = observable(datePickerStatus)
const withNoInputStatus = observable(datePickerStatus)
const addTimeStore = observable(datePickerStatus)

export const ComDatePicker = () => {
  return (
    <>
      <div className='gm-margin-tb-10'>normal</div>
      <DatePicker
        date={commonStore.date}
        placeholder='请选择日期'
        onChange={(date) => commonStore.setDate(date)}
      />
      <div className='gm-margin-tb-10'>自定义日期展示形式</div>
      <DatePicker
        date={inputValueRenderStore.date}
        placeholder='请选择日期'
        onChange={(date) => inputValueRenderStore.setDate(date)}
        renderDate={(begin) => `${begin.getMonth() + 1}月-${begin.getDate()}日`}
      />
    </>
  )
}

export const ComDatePickerWithDisabled = () => {
  return (
    <>
      <div className='gm-margin-tb-10'>禁止点击选择</div>
      <DatePicker
        date={disabledStore1.date}
        placeholder='请选择日期'
        disabled
        onChange={(date) => disabledStore1.setDate(date)}
      />
      <div className='gm-margin-tb-10'>自定义禁止选择的日期段</div>
      <div>
        <div className='gm-text-20 gm-margin-10'>只能选择非周五的日期</div>
        <DatePicker
          date={disabledStore2.date}
          placeholder='非周五'
          disabledDate={(m) => {
            return moment(m).get('day') === 5
          }}
          onChange={(date) => disabledStore2.setDate(date)}
        />
        <div className='gm-text-20 gm-margin-10'>只能选择今天之后的日期</div>
        <DatePicker
          date={disabledStore3.date}
          placeholder='选今天之后的'
          min={new Date()}
          onChange={(date) => disabledStore3.setDate(date)}
        />
      </div>
    </>
  )
}

export const ComDatePickerWithCustomChildren = () => (
  <>
    <div className='gm-margin-tb-10'>自定义children</div>
    <DatePicker
      date={withNoInputStatus.date}
      onChange={(date) => withNoInputStatus.setDate(date)}
    >
      <span>
        {withNoInputStatus.date
          ? moment(withNoInputStatus.date!).format('YYYY-MM-DD')
          : '请点击选择'}
      </span>
    </DatePicker>
  </>
)

export const ComDatePickerWithTimeSelect = () => (
  <>
    <div className='gm-margin-tb-10'>增加时间选择</div>
    <DatePicker
      preserveTime
      date={addTimeStore.date}
      placeholder='请选择日期'
      onChange={(date) => {
        addTimeStore.setDate(date)
      }}
      enabledTimeSelect
    />
  </>
)

export default {
  title: '表单/DatePicker',
}
