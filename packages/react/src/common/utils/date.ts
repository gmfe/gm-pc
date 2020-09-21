import moment, { Moment } from 'moment'

// 设置moment的时间值
const setTimes = (date: Moment, time?: Moment): Moment => {
  // 没有设置时间
  if (!time) {
    return moment(date)
  }

  const year = moment(date).year()
  const month = moment(date).month()
  const day = moment(date).date()

  return moment(time).set({ year, month, date: day })
}

const getTimeCells = (span: number): Moment[] => {
  let time = moment().startOf('day')
  const cells = []
  while (time <= moment().endOf('day')) {
    cells.push(time)
    time = moment(+time + span)
  }
  cells.push(moment().endOf('day'))
  return cells
}

export { setTimes, getTimeCells }
