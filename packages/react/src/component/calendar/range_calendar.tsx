import React, { useState, FC, useEffect } from 'react'
import moment, { Moment } from 'moment'
import classNames from 'classnames'
import _ from 'lodash'

import Week from './week'
import Content from './content'
import Head from './head'
import { RangeCalendarProps } from './types'

const RangeCalendar: FC<RangeCalendarProps> = (props) => {
  const {
    begin,
    end,
    onSelect,
    willActiveSelected,
    onWillActiveSelected,

    min,
    max,
    disabledDate,

    disabledYearAndMonth,

    hoverDay,
    onHoverDay,

    className,
    ...rest
  } = props

  // 取值优先 willActiveSelected > begin > 当前
  const _will = willActiveSelected
    ? moment(willActiveSelected)
    : begin
    ? moment(begin)
    : moment()

  // 需要有状态，因为 willActiveSelected 非必传
  const [will, setWill] = useState(_will)
  // 响应 willActiveSelected 的变化，重新设置 will
  useEffect(() => {
    const new_will = willActiveSelected
      ? moment(willActiveSelected)
      : begin
      ? moment(begin)
      : moment()
    if (willActiveSelected) {
      setWill(new_will)
    }
  }, [willActiveSelected, begin])

  const handleSelectDay = (m: Moment): void => {
    if (!onSelect) {
      return
    }

    // 如果都有，则当做选 begin
    if (begin && end) {
      onSelect(m.toDate(), null)
    } else if (begin) {
      // 如果相等，选中同一天
      if (+begin === +m) {
        onSelect(m.toDate(), m.toDate())
      }

      // 根据大小调整 begin end
      if (+begin < +m) {
        onSelect(begin, m.toDate())
      } else {
        onSelect(m.toDate(), begin)
      }
    } else if (end) {
      // 如果相等，选中同一天
      if (+end === +m) {
        onSelect(m.toDate(), m.toDate())
      }

      // 根据大小调整 begin end
      if (+end < +m) {
        onSelect(end, m.toDate())
      } else {
        onSelect(m.toDate(), end)
      }
    }
    // 如果都没有，则当做选 begin
    else {
      onSelect(m.toDate(), null)
    }
  }

  const handleChangeHead = (m: Moment): void => {
    setWill(m)

    onWillActiveSelected && onWillActiveSelected(m.toDate())
  }

  return (
    <div {...rest} className={classNames('gm-calendar', className)}>
      <Head
        value={will}
        onChange={handleChangeHead}
        disabledYearAndMonth={disabledYearAndMonth!}
      />
      <Week />
      <Content
        begin={(begin && moment(begin))!}
        end={(end && moment(end))!}
        onSelect={handleSelectDay}
        will={will}
        min={min}
        max={max}
        disabledDate={disabledDate}
        hoverDay={hoverDay}
        onHoverDay={onHoverDay}
      />
    </div>
  )
}

export default RangeCalendar
