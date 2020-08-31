import React, { FC, ReactNode } from 'react'
import moment, { Moment } from 'moment'
import _ from 'lodash'
import classNames from 'classnames'

import { Flex } from '../flex'
import { TimeSpanProps } from './type'
import { getTime, renderItemFunc } from './util'

const initMin = moment().startOf('day').toDate()
const initMax = moment().endOf('day').toDate()

const TimeSpan: FC<TimeSpanProps> = ({
  min = initMin,
  max = initMax,
  disabledSpan,
  span = 30 * 60 * 1000,
  time,
  renderItem = renderItemFunc,
  onChange,
  beginTime,
  enabledEndTimeOfDay,
  endTime,
}) => {
  const _beginTime = getTime(beginTime) ?? moment().startOf('day')
  const _endTime = getTime(endTime) ?? moment().endOf('day')

  const getTimeCells = () => {
    let time = _beginTime
    const cells = []
    while (time <= _endTime) {
      cells.push(time)
      time = moment(+time + span!)
    }
    if (enabledEndTimeOfDay) {
      cells.push(moment().endOf('day'))
    }

    // 分三列
    let len = Math.ceil(cells.length / 3)
    if (len % 2) {
      len++
    }
    const firstCells = cells.slice(0, len)
    const middleCells = cells.slice(len, 2 * len)
    const finalCells = cells.slice(2 * len)
    return [firstCells, middleCells, finalCells]
  }

  const handleSelectTime = (value: Moment): void => {
    onChange && onChange(value.toDate())
  }

  const isActive = (value: Moment): boolean => {
    const select = moment(time)

    // 判断时/分 是否相同
    return value.hour() === select.hour() && value.minute() === select.minute()
  }

  const isDisable = (time: Moment): boolean => {
    // 无需限制
    if (!max && !min && !disabledSpan) {
      return false
    }
    const dMax = max ? moment(max) : _endTime
    const dMin = min ? moment(min) : _beginTime
    const dTime = moment(time)
    return (
      !(dTime <= dMax && dTime >= dMin) ||
      ((disabledSpan && disabledSpan(time.toDate())) as boolean)
    )
  }

  const renderTimesList = (cells: Moment[]): ReactNode => {
    let width = '50px'
    if (span! >= 60 * 60 * 1000) {
      width = '100px'
    }

    return (
      <Flex wrap row className='gm-time-span-list'>
        {cells.map((value) => {
          const disabled = isDisable(value)
          return (
            <span
              key={value.format('HH:mm')}
              className={classNames('gm-time-span-list-cell', {
                active: isActive(value),
                disabled,
              })}
              style={{ width }}
              onClick={disabled ? _.noop : () => handleSelectTime(value)}
            >
              {renderItem!(value.toDate())}
            </span>
          )
        })}
      </Flex>
    )
  }

  const cells = getTimeCells()
  const totalWidth = cells.filter((cell) => cell.length).length * 130

  return (
    <Flex row className='gm-time-span' style={{ width: `${totalWidth}px` }}>
      {cells.map((cell, index) => {
        if (!cell.length) {
          // 时间间隔比较大时，某一列无数据的情况
          return null
        }
        return (
          <Flex
            key={index}
            className={classNames({
              'gm-border-right': index !== cells.length - 1,
            })}
            alignStart
          >
            {renderTimesList(cell)}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default TimeSpan
