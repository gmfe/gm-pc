import React from 'react'
import { observable } from 'mobx'
import moment from 'moment'
import { getLocale } from '@gm-pc/locales'

import { QuickSelectListOptions } from './types'
import DateRangePicker from './date_range_picker'

const store = observable({
  begin: new Date(),
  end: new Date(),
  changeDate(begin: Date | null, end: Date | null) {
    this.begin = begin as any
    this.end = end as any
  },
})

const _store = {
  begin: null,
  end: null,
  changeDate(begin: Date | null, end: Date | null) {
    const value = moment(end!).format('YYYY-MM-DD')
    console.log(moment(end!).add(1, 'ms').isSame(moment(value).add(1, 'd')))
    this.begin = begin as any
    this.end = end as any
  },
}

const storeNull = observable(_store)

const store3 = observable({
  begin: moment().hour(14).minute(0).toDate(),
  end: moment().hour(18).minute(0).toDate(),
  changeDate(begin: Date | null, end: Date | null) {
    this.begin = begin as any
    this.end = end as any
  },
})

const disabledBegin = (date: Date) => {
  return moment(date).isSameOrBefore(moment(date).hour(11))
}

const lastDaysofLastMonth = moment().add(-1, 'month').endOf('month')
const diffDays = moment().diff(lastDaysofLastMonth, 'days')
const lastMonthDays = moment(
  lastDaysofLastMonth.format('YYYY-MM'),
  'YYYY-MM'
).daysInMonth()
const quickList: QuickSelectListOptions[] = [
  {
    range: [
      [0, 'day'],
      [0, 'day'],
    ],
    text: getLocale('今天'),
  },
  {
    range: [
      [-(lastMonthDays + diffDays), 'day'],
      [-(diffDays + 1), 'day'],
    ],
    text: getLocale('上个月'),
  },
]

export const ComDateRangePickerInfo = () => (
  <>
    <div>额外增加时间选择功能说明：</div>
    <div>时间选择展示以 00:00 ～ 24:00 表示一天</div>
    <div>24:00的返回形式为moment(date).endOf(`day`),与第二天 00:00 相差 1ms</div>
    <div>调用方传给后台时需要自行加一层判断转换成 第二天的00:00</div>
    <div>若需要自定义 日期展示格式, 也需要自行处理这个情况</div>
    <div>特殊限制只能通过disabledDate来实现</div>
  </>
)

export const ComDateRangePicker = () => (
  <>
    <DateRangePicker
      begin={storeNull.begin}
      end={storeNull.end}
      onChange={(begin, end) => storeNull.changeDate(begin, end)}
    />
    <div className='gm-gap-10' />
    <div>自定义日期展示</div>
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
      renderDate={(begin, end) =>
        `${moment(begin).format('YYYY-MM-DD')} - ${moment(end).format('MM / DD')}`
      }
    />
    <div className='gm-gap-10' />
    <div>children自定义</div>
    <DateRangePicker
      begin={storeNull.begin}
      end={storeNull.end}
      onChange={(begin, end) => storeNull.changeDate(begin, end)}
    >
      <div className='gm-margin-20'>
        开始
        {storeNull.begin ? moment(storeNull.begin ?? undefined).format('YYYY-MM-DD') : ''}
        结束
        {storeNull.end ? moment(storeNull.end ?? undefined).format('YYYY-MM-DD') : ''}
      </div>
    </DateRangePicker>
  </>
)

export const ComDateRangePickerWithDisabledDate = () => (
  <>
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
      min={moment().toDate()}
      max={moment().add(10, 'day').toDate()}
    />
    <div className='gm-gap-10' />
    <div>限制一个月</div>
    <DateRangePicker
      begin={storeNull.begin}
      end={storeNull.end}
      onChange={(begin, end) => storeNull.changeDate(begin, end)}
      disabledDate={(d, { begin }) => {
        if (begin) {
          if (+moment(d) > +moment(begin).add(1, 'month')) {
            return true
          }
        }
        return false
      }}
    />
  </>
)

export const ComDateRangePickerWithClear = () => (
  <DateRangePicker
    begin={store.begin}
    end={store.end}
    onChange={(begin, end) => store.changeDate(begin, end)}
    canClear
  />
)

export const ComDateRangePickerWithTimeSelect = () => (
  <DateRangePicker
    begin={store3.begin}
    end={store3.end}
    onChange={(begin, end) => store3.changeDate(begin, end)}
    enabledTimeSelect
    beginTimeSelect={{
      defaultTime: moment().startOf('day').hour(12).toDate(),
      disabledSpan: disabledBegin,
    }}
    endTimeSelect={{
      disabledSpan: disabledBegin,
    }}
    timeSpan={60 * 60 * 1000}
  />
)

export const ComDateRangePickerWithQuickSelect = () => (
  <>
    <div>自定义左侧选择</div>
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
      customQuickSelectList={quickList}
    />
  </>
)

export default {
  title: '表单/DateRangePicker',
}
